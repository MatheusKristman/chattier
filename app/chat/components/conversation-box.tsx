"use client";

import { Dot, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ConversationBox = () => {
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

  return (
    <Link
      href={`/chat/iddaconversa`}
      className="px-6 py-4 flex items-center justify-between hover:bg-gray-primary sm:px-16 lg:px-6"
    >
      <div className="flex items-center gap-x-5">
        {/* TODO quando o usuário não tem foto */}
        <div
          className={cn(
            "relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center",
            defaultUserColor
          )}
        >
          <UserRound size="25" />
        </div>

        <div className="flex flex-col gap-y-1">
          <h3 className="text-white text-lg font-semibold">Carl Doe</h3>

          <p className="line-clamp-1 w-2/3 text-white/50 text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
            corrupti dolores iusto ratione, quo et provident numquam ea. Fuga,
            animi.
          </p>
        </div>
      </div>

      <div className="flex items-center">
        {/* TODO: ultima vez online */}
        <Dot color="white" strokeWidth={3} opacity={0.5} />

        <span className="text-white/50 text-sm -ml-1">2h</span>
      </div>
    </Link>
  );
};
