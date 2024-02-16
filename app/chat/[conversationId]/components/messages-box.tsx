"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { find } from "lodash";

import { MessageBox } from "./message-box";
import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import { pusherClient } from "@/lib/pusher";

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

  return (
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
  );
};
