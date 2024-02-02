import { Dot } from "lucide-react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConversationBox } from "./conversation-box";
import Link from "next/link";
import useContactStore from "@/stores/use-contact-store";
import { ProfileBox } from "./profile-box";
import { NewConversationButton } from "./new-conversation-button";
import { cn } from "@/lib/utils";

export const Contacts = ({ conversationId }: { conversationId?: string }) => {
  return (
    <div
      className={cn(
        "w-full min-h-screen bg-gray-secondary flex-col gap-y-12 lg:w-[450px]",
        conversationId ? "hidden lg:flex" : "flex"
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
        <ConversationBox />
        <ConversationBox />
        <ConversationBox />
      </div>
    </div>
  );
};
