"use client";

import { Dot, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { formatDistance } from "date-fns";

import { cn } from "@/lib/utils";
import useDefaultUserColor from "@/hooks/useDefaultUserColor";
import useConversation from "@/hooks/useConversation";
import useOtherUser from "@/hooks/useOtherUser";
import { FullConversationType } from "@/types";
import { useMemo } from "react";

interface ConversationBoxProps {
  selected: boolean;
  conversation: FullConversationType;
}

export const ConversationBox = ({
  selected,
  conversation,
}: ConversationBoxProps) => {
  const { randomColor } = useDefaultUserColor();
  const otherUser = useOtherUser(conversation);

  const lastMessage = useMemo(() => {
    const messages = conversation.messages || [];

    return messages[messages.length - 1];
  }, [conversation.messages]);

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
              className="object-cover object-center"
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

        {/* {isUserBlocked ? <span>Bloqueado</span> : null} */}
      </div>

      {lastMessage ? (
        <div className="flex items-center">
          {/* TODO: ultima vez online */}
          <Dot color="white" strokeWidth={3} opacity={0.5} />

          <span className="text-white/50 text-sm -ml-1">
            {formatDistance(lastMessage.createdAt, new Date())}
          </span>
        </div>
      ) : null}
    </Link>
  );
};
