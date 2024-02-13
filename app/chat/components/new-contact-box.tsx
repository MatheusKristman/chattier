"use client";

import { UserRound } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import useContactStore from "@/stores/use-contact-store";

interface NewContactBoxProps {
  imageSrc?: string | null;
  name: string;
  userId: string;
}

export const NewContactBox = ({
  imageSrc,
  name,
  userId,
}: NewContactBoxProps) => {
  const { closeNewConversationModal } = useContactStore();
  const { data: session } = useSession();
  const router = useRouter();

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

  function handleNewConversation() {
    axios
      .post("/api/conversation/create-conversation", {
        otherUserId: userId,
      })
      .then((res) => {
        closeNewConversationModal();

        router.push(`/chat/${res.data.id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center justify-center gap-x-5">
        <div
          className={cn(
            "relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center",
            { defaultUserColor: !session?.user?.image },
          )}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Foto de perfil"
              fill
              className="object-cover object-center"
            />
          ) : (
            <UserRound size="25" />
          )}
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="text-white text-lg font-semibold">{name}</h4>
        </div>
      </div>

      <Button
        onClick={handleNewConversation}
        size="lg"
        className="bg-white rounded-lg hover:bg-white hover:shadow-lg hover:shadow-[#b64862] transition-shadow"
      >
        <span className="text-gradient">Conversar</span>
      </Button>
    </div>
  );
};
