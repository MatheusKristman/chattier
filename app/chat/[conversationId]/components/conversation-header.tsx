"use client";

import Image from "next/image";
import { ChevronLeft, MoreVertical, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { BlockedUser, Conversation, User } from "@prisma/client";
import { cn } from "@/lib/utils";
import useOtherUser from "@/hooks/useOtherUser";
import useDefaultUserColor from "@/hooks/useDefaultUserColor";
import { Skeleton } from "@/components/ui/skeleton";

interface ConversationHeaderProps {
  conversation: Conversation & {
    user: User[];
  };
  isOtherUserBlocked: boolean;
}

export const ConversationHeader = ({
  conversation,
  isOtherUserBlocked,
}: ConversationHeaderProps) => {
  const router = useRouter();
  const otherUser = useOtherUser(conversation);
  const defaultUserColor = useDefaultUserColor();

  function handleBlockUser() {
    axios
      .put("/api/conversation/block-user", { conversationId: conversation.id })
      .then(() => router.refresh())
      .catch((error) => console.error(error));
  }

  function handleUnblockUser() {
    axios
      .put("/api/conversation/unblock-user", {
        conversationId: conversation.id,
      })
      .then(() => router.refresh())
      .catch((error) => console.error(error));
  }

  if (!otherUser) {
    return <ConversationHeaderSkeleton />;
  }

  return (
    <div className="w-full flex items-center justify-between mb-12">
      <div className="flex items-center gap-x-2 sm:gap-x-5">
        <Button variant="link" onClick={() => router.push("/chat")}>
          <ChevronLeft color="#FFF" size="30px" />
        </Button>

        <div
          className={cn(
            "relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center",
            `${!otherUser ? defaultUserColor : ""}`,
          )}
        >
          {otherUser?.image ? (
            <Image
              src={otherUser.image}
              alt="Perfil"
              fill
              className="object-center object-cover"
            />
          ) : (
            <UserRound size="25" />
          )}
        </div>

        <h4 className="text-xl text-white font-semibold">{otherUser?.name}</h4>

        {isOtherUserBlocked ? (
          <span className="border border-red-500 rounded py-1 px-2 text-red-500 text-base text-medium">
            Bloqueado
          </span>
        ) : null}
      </div>

      <Popover>
        <PopoverTrigger>
          <MoreVertical color="#FFFFFF" size="30px" />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="bg-[#212A35] border-none rounded-xl rounded-tr-none space-y-6"
        >
          {isOtherUserBlocked ? (
            <Button
              onClick={handleUnblockUser}
              className="w-full border-2 border-green-500 bg-transparent text-green-500 hover:text-white hover:bg-green-500 text-base font-semibold"
            >
              Desbloquear usuário
            </Button>
          ) : (
            <Button
              onClick={handleBlockUser}
              variant="destructive"
              className="w-full border-2 border-red-500 bg-transparent text-red-500 hover:text-white text-base font-semibold"
            >
              Bloquear usuário
            </Button>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

const ConversationHeaderSkeleton = () => {
  return (
    <div className="w-full flex items-center justify-between mb-12">
      <div className="flex items-center gap-x-2 sm:gap-x-5">
        <Skeleton className="h-10 w-6 mx-4" />

        <div className="relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center">
          <Skeleton className="w-full h-full" />
        </div>

        <Skeleton className="w-40 h-6" />
      </div>

      <Skeleton className="w-4 h-8" />
    </div>
  );
};
