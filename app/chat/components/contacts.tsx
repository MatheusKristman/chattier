import Image from "next/image";
import Link from "next/link";

import { Input } from "@/components/ui/input";
import { ConversationBox } from "./conversation-box";
import { ProfileBox } from "./profile-box";
import { NewConversationButton } from "./new-conversation-button";
import { cn } from "@/lib/utils";
import { FullConversationType } from "@/types";
import useConversation from "@/hooks/useConversation";
import { User } from "@prisma/client";
import { NewConversationModal } from "./new-conversation-modal";

interface ContactsProps {
  initialConversations: FullConversationType[];
  newContacts: User[];
  conversationParams?: { conversationId: string };
}

export const Contacts = ({
  initialConversations,
  newContacts,
  conversationParams,
}: ContactsProps) => {
  const { isOpen, conversationId } = useConversation(conversationParams);

  return (
    <>
      <NewConversationModal newContacts={newContacts} />
      <div
        className={cn(
          "w-full min-h-screen bg-gray-secondary flex-col gap-y-12 lg:w-[450px]",
          isOpen ? "hidden lg:flex" : "flex",
        )}
      >
        <Link href="/" className="w-full flex justify-center items-center mt-6">
          <Image src="/images/logo.svg" alt="Chattie" width="150" height="41" />
        </Link>

        <ProfileBox />

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
          {initialConversations.length > 0 ? (
            initialConversations.map((conversation) => (
              <ConversationBox
                key={conversation.id}
                conversation={conversation}
                selected={conversationId === conversation.id}
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
