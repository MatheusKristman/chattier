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
import { Skeleton } from "@/components/ui/skeleton";

interface MessagesBoxProps {
  initialMessages: FullMessageType[];
  conversationParams?: { conversationId: string };
}

export const MessagesBox = ({
  initialMessages,
  conversationParams,
}: MessagesBoxProps) => {
  const [messages, setMessages] = useState(initialMessages);

  const { data: session, status } = useSession();
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
  }, [messages, status]);

  if (status === "loading") {
    return <MessagesBoxSkeleton />;
  }

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

const MessagesBoxSkeleton = () => {
  return (
    <div className="w-full flex-1 flex flex-col gap-y-6">
      <div className="w-full flex flex-row-reverse items-center justify-start group">
        <Skeleton className="w-2/3 h-40 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none relative pb-2 xl:w-2/5 cursor-pointer" />
      </div>

      <div className="w-full flex flex-row items-center justify-start group">
        <Skeleton className="w-2/3 h-32 rounded-tl-3xl rounded-tr-3xl rounded-bl-none rounded-br-3xl relative pb-2 xl:w-2/5 cursor-pointer" />
      </div>

      <div className="w-full flex flex-row-reverse items-center justify-start group">
        <Skeleton className="w-2/3 h-52 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-none relative pb-2 xl:w-2/5 cursor-pointer" />
      </div>
    </div>
  );
};
