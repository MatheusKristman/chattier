"use client";

import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { find } from "lodash";

import { MessageBox } from "./message-box";
import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import { pusherClient } from "@/lib/pusher";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessagesBoxProps {
  initialMessages: FullMessageType[];
  conversationParams?: { conversationId: string };
}

export const MessagesBox = ({
  initialMessages,
  conversationParams,
}: MessagesBoxProps) => {
  const [messages, setMessages] = useState(initialMessages);

  const { data: session } = useSession();
  const { conversationId } = useConversation(conversationParams);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    axios.post(`/api/conversation/${conversationId}/seen`);
  }, [conversationId]);

  // TODO criar função para lidar com mensagem nova e update
  useEffect(() => {
    pusherClient.subscribe(conversationId);

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversation/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        }),
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView({ block: "end" });
    console.log("scrollado");
  }, [messages]);

  return (
    <ScrollArea>
      <div className="w-full flex-1 flex flex-col gap-y-6">
        {messages.map((message, index) => (
          <MessageBox
            key={message.id}
            isLast={index === messages.length - 1}
            message={message}
            otherMessage={session?.user?.email !== message.sender.email}
          />
        ))}
      </div>

      <div ref={bottomRef} />
    </ScrollArea>
  );
};
