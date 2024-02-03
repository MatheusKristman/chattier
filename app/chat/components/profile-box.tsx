"use client";

import { UserRound } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
// @ts-ignore
import TailwindColor from "@videsk/tailwind-random-color";

import { cn } from "@/lib/utils";
import useContactStore from "@/stores/use-contact-store";

// TODO arrumar responsividade da box quando for uma tela muito pequena

export const ProfileBox = () => {
  const { data: session } = useSession();
  const { openProfileModal } = useContactStore();

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
    <div
      onClick={openProfileModal}
      role="button"
      className="p-5 flex items-center justify-between rounded-xl bg-gray-primary mx-6 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-none lg:w-auto lg:mx-6"
    >
      <div className="flex items-center justify-center gap-x-5">
        {/* TODO quando o usuário não tem foto */}
        <div
          className={cn(
            "relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center",
            { defaultUserColor: !session?.user?.image }
          )}
        >
          {session?.user?.image ? (
            <Image
              src={session.user.image}
              alt="Foto de perfil"
              fill
              className="object-cover object-center"
            />
          ) : (
            <UserRound size="25" />
          )}
        </div>

        <div className="flex flex-col gap-y-1">
          <h3 className="text-white text-xl font-semibold">John Doe</h3>

          <span className="text-white text-base font-medium">@johndoe</span>
        </div>
      </div>

      <div className="bg-[#212A35] rounded-lg flex items-center justify-center w-14 h-14">
        {/* TODO: status do perfil */}
        <Image
          src="/images/online-icon.svg"
          alt="Online"
          width={25}
          height={25}
          className="object-contain object-center"
        />
      </div>
    </div>
  );
};
