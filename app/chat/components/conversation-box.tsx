"use client";

import { Dot, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import useDefaultUserColor from "@/hooks/useDefaultUserColor";
import useConversation from "@/hooks/useConversation";
import useOtherUser from "@/hooks/useOtherUser";
import { BlockedUserWithProfileBlocked, FullConversationType } from "@/types";
import { useMemo } from "react";

interface ConversationBoxProps {
  selected: boolean;
  conversation: FullConversationType;
  blockedUsers: BlockedUserWithProfileBlocked[];
}

export const ConversationBox = ({
  selected,
  conversation,
  blockedUsers,
}: ConversationBoxProps) => {
  const { randomColor } = useDefaultUserColor();
  const otherUser = useOtherUser(conversation);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];

    return messages[messages.length - 1];
  }, [conversation.messages]);

  const isUserBlocked = useMemo(() => {
    return !!blockedUsers.find(
      (blocked) => blocked.userBlockedId === otherUser.id,
    );
  }, [blockedUsers, otherUser]);

  return (
    <Link
      href={`/chat/${conversation.id}`}
      className={cn(
        "px-6 py-4 flex items-center justify-between gap-x-12 hover:bg-gray-primary transition-colors sm:px-16 lg:px-6",
        { "bg-gray-primary/70": selected },
      )}
    >
      <div className="flex items-center gap-x-5">
        {/* TODO quando o usuário não tem foto */}
        <div
          className={cn(
            "relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center",
            randomColor,
          )}
        >
          {otherUser.image ? (
            <Image
              src={otherUser.image}
              alt="Foto de perfil"
              fill
              className={cn("object-cover object-center", {
                grayscale: isUserBlocked,
              })}
            />
          ) : (
            <UserRound size="25" />
          )}
        </div>

        <div className="flex flex-col gap-y-1">
          <h3 className="text-white text-lg font-semibold">{otherUser.name}</h3>

          <p className="line-clamp-1 w-full text-white/50 text-sm">
            {lastMessage ? lastMessage.content : <>Conversa Iniciada</>}
          </p>
        </div>
      </div>

      {isUserBlocked ? (
        <span className="border border-red-500 rounded py-1 px-2 text-red-500 text-sm text-medium">
          Bloqueado
        </span>
      ) : lastMessage ? (
        <div className="flex items-center">
          {/* TODO: ultima vez online */}
          <Dot color="white" strokeWidth={3} opacity={0.5} />

          <span className="text-white/50 text-sm -ml-1">
            {format(lastMessage.createdAt, "p")}
          </span>
        </div>
      ) : null}
    </Link>
  );
};
