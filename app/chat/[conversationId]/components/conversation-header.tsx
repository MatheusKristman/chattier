"use client";

import Image from "next/image";
import { ChevronLeft, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export const ConversationHeader = () => {
  const router = useRouter();

  return (
    <div className="w-full flex items-center justify-between mb-12">
      <div className="flex items-center gap-x-2 sm:gap-x-5">
        <Button variant="link" onClick={() => router.push("/chat")}>
          <ChevronLeft color="#FFF" size="30px" />
        </Button>

        <div className="relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src="/images/profile-test.png"
            alt="Perfil"
            fill
            className="object-center object-cover"
          />
        </div>

        <h4 className="text-xl text-white font-semibold">Carl Doe</h4>
      </div>

      <Popover>
        <PopoverTrigger>
          <MoreVertical color="#FFFFFF" size="30px" />
        </PopoverTrigger>

        <PopoverContent
          align="end"
          className="bg-[#212A35] border-none rounded-xl rounded-tr-none space-y-6"
        >
          <Button
            variant="destructive"
            className="w-full border-2 border-red-500 bg-transparent text-red-500 hover:text-white text-base font-semibold"
          >
            Bloquear usuário
          </Button>

          <Button
            variant="destructive"
            className="w-full text-base font-semibold"
          >
            Deletar conversa
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
