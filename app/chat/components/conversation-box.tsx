"use client";

import { Dot, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistance } from "date-fns";

import { cn } from "@/lib/utils";
import { Message, User } from "@prisma/client";
import { usePathname } from "next/navigation";

interface ConversationBoxProps {
  conversationId: string;
}

export const ConversationBox = ({ conversationId }: ConversationBoxProps) => {
  const pathname = usePathname();

  console.log(pathname);

  const [defaultUserColor, setDefaultUserColor] = useState("");
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [lastMessage, setLastMessage] = useState<Message | null>(null);

  useEffect(() => {
    function getRandomColor(array: string[]) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }

    const colors = [
      "bg-red-400",
      "bg-orange-400",
      "bg-amber-400",
      "bg-green-400",
      "bg-teal-400",
    ];
    const randomColor = getRandomColor(colors);

    setDefaultUserColor(randomColor);
  }, [setDefaultUserColor]);

  useEffect(() => {
    if (conversationId) {
      console.log(conversationId);
      axios
        .get(`/api/conversation/get-user/${conversationId}`)
        .then((res) => {
          console.log(res.data);

          setOtherUser(res.data.otherUser);
          setLastMessage(res.data.lastMessage[0] || null);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [conversationId]);

  return (
    <Link
      href={`/chat/${conversationId}`}
      className={cn(
        "px-6 py-4 flex items-center justify-between gap-x-12 hover:bg-gray-primary transition-colors sm:px-16 lg:px-6",
        { "bg-gray-primary/70": pathname?.includes(conversationId) },
      )}
    >
      <div className="flex items-center gap-x-5">
        {/* TODO quando o usuário não tem foto */}
        <div
          className={cn(
            "relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center",
            defaultUserColor,
          )}
        >
          {otherUser?.image ? (
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
          <h3 className="text-white text-lg font-semibold">
            {otherUser?.name}
          </h3>

          <p className="line-clamp-1 w-full text-white/50 text-sm">
            {lastMessage ? lastMessage.content : <>Conversa Iniciada</>}
          </p>
        </div>
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
