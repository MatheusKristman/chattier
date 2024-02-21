"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useState, useEffect, useMemo } from "react";
import { User } from "@prisma/client";
import { find } from "lodash";

import { Input } from "@/components/ui/input";
import { ConversationBox } from "./conversation-box";
import { ProfileBox } from "./profile-box";
import { NewConversationButton } from "./new-conversation-button";
import { cn } from "@/lib/utils";
import { BlockedUserWithProfileBlocked, FullConversationType } from "@/types";
import useConversation from "@/hooks/useConversation";
import { NewConversationModal } from "./new-conversation-modal";
import { pusherClient } from "@/lib/pusher";

interface ContactsProps {
  initialConversations: FullConversationType[];
  newContacts: User[];
  conversationParams?: { conversationId: string };
  blockedUsers: BlockedUserWithProfileBlocked[];
}

export const Contacts = ({
  initialConversations,
  newContacts,
  conversationParams,
  blockedUsers,
}: ContactsProps) => {
  const { data: session } = useSession();
  const router = useRouter();

  const { isOpen, conversationId } = useConversation(conversationParams);

  const [conversations, setConversations] = useState(initialConversations);

  const pusherKey = useMemo(() => {
    return session?.user?.email;
  }, [session?.user?.email]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setConversations((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    const updateHandler = (conversation: FullConversationType) => {
      setConversations((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            return {
              ...currentConversation,
              messages: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updateHandler);
  }, [pusherKey, router]);

  return (
    <>
      <NewConversationModal newContacts={newContacts} />
      <div
        className={cn(
          "w-full min-h-screen bg-gray-secondary flex-col gap-y-12 lg:w-[450px]",
          isOpen ? "hidden lg:flex" : "flex"
        )}
      >
        <Link href="/" className="w-full flex justify-center items-center mt-6">
          <Image src="/images/logo.svg" alt="Chattie" width="150" height="41" />
        </Link>

        <ProfileBox blockedUsers={blockedUsers} />

        <div className="mx-6 flex flex-col gap-y-6 sm:mx-16 lg:mx-6">
          <div className="relative">
            <Input
              placeholder="Pesquise uma conversa"
              className="bg-gray-primary rounded-lg w-full h-12 placeholder:text-gray-600 text-base border-none pl-12 text-white"
            />

            <span
              aria-hidden="true"
              className="bg-search-icon bg-no-repeat bg-contain bg-center w-7 h-7 absolute top-1/2 left-2.5 -translate-y-1/2"
            />
          </div>

          <NewConversationButton />
        </div>

        <div className="w-full flex flex-col">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <ConversationBox
                key={conversation.id}
                conversation={conversation}
                selected={conversationId === conversation.id}
                blockedUsers={blockedUsers}
              />
            ))
          ) : (
            <div className="mx-6 p-3 flex items-center justify-center border-2 border-dashed border-[#0c1014] rounded-lg">
              <span className="text-xl font-semibold text-white/70">
                Nenhuma Conversa
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
