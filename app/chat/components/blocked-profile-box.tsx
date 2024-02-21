"use client";

import Image from "next/image";
import { UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

interface BlockedProfileBoxProps {
  isUploading: boolean;
  isSendingImage: boolean;
  imageSrc: string | null;
  name: string;
  blockedUserId: string;
}

export const BlockedProfileBox = ({
  isUploading,
  isSendingImage,
  imageSrc,
  name,
  blockedUserId,
}: BlockedProfileBoxProps) => {
  const router = useRouter();

  function UnblockProfile(id: string) {
    axios
      .put("/api/blocked-user/unblock-user", { blockedUserId: id })
      .then((res) => router.refresh())
      .catch((error) => {
        toast.error(error.response.data);

        console.error(error);
      });
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <div className="relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Contato Bloqueado"
              fill
              className="object-center object-cover"
            />
          ) : (
            <UserRound size="25" />
          )}
        </div>

        <h4 className="text-lg text-white font-semibold">{name}</h4>
      </div>

      <Button
        onClick={() => UnblockProfile(blockedUserId)}
        disabled={isUploading || isSendingImage}
        size="lg"
        className="bg-transparent border border-green-500 rounded-lg text-green-500 font-medium text-base hover:bg-green-500/20"
      >
        Desbloquear
      </Button>
    </div>
  );
};
