import Image from "next/image";

import { Button } from "@/components/ui/button";

interface BlockedProfileBoxProps {
  isUploading: boolean;
  isSendingImage: boolean;
}

export const BlockedProfileBox = ({
  isUploading,
  isSendingImage,
}: BlockedProfileBoxProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <div className="relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src="/images/profile-test.png"
            alt="Contato Bloqueado"
            fill
            className="object-center object-cover"
          />
        </div>

        <h4 className="text-lg text-white font-semibold">Carl Doe</h4>
      </div>

      <Button
        disabled={isUploading || isSendingImage}
        size="lg"
        className="bg-transparent border border-green-500 rounded-lg text-green-500 font-medium text-base hover:bg-green-500/20"
      >
        Desbloquear
      </Button>
    </div>
  );
};
