"use client";

import Image from "next/image";
import { ChevronLeft, MoreVertical, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BlockedUser, User } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ConversationHeaderProps {
  conversationId: string;
  blockedUsers: BlockedUser[];
  setBlockedUsers: Dispatch<SetStateAction<BlockedUser[]>>;
}

export const ConversationHeader = ({
  conversationId,
  blockedUsers,
  setBlockedUsers,
}: ConversationHeaderProps) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);
  const [defaultUserColor, setDefaultUserColor] = useState("");

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
    axios
      .get(`/api/conversation/get-conversation-users/${conversationId}`)
      .then((res) => {
        setUser(res.data.user);
        setOtherUser(res.data.otherUser);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [conversationId]);

  useEffect(() => {
    if (blockedUsers.length > 0 && otherUser) {
      const hasBlockedUser = blockedUsers.find((blocked) =>
        blocked.userBlockedId.includes(otherUser?.id),
      );

      if (hasBlockedUser) {
        setIsUserBlocked(true);
      } else {
        setIsUserBlocked(false);
      }
    } else if (blockedUsers.length === 0 && otherUser) {
      setIsUserBlocked(false);
    } else {
      setIsUserBlocked(false);
    }
  }, [blockedUsers, otherUser]);

  function handleBlockUser() {
    axios
      .put("/api/conversation/block-user", { conversationId })
      .then((res) => {
        toast.success(res.data.message);
        setUser(res.data.user);
        setOtherUser(res.data.otherUser);
        setBlockedUsers(res.data.blockedUser);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {});
  }

  function handleUnblockUser() {
    axios
      .put("/api/conversation/unblock-user", { conversationId })
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setUser(res.data.user);
        setOtherUser(res.data.otherUser);
        setBlockedUsers(res.data.blockedUser);
      });
  }

  console.log(blockedUsers);

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

        {isUserBlocked ? (
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
          {isUserBlocked ? (
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
