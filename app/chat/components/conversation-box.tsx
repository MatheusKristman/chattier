import { Dot } from "lucide-react";
import Image from "next/image";

export const ConversationBox = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-x-5">
        <div className="relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src="/images/profile-test.png"
            alt="Nome do usuário"
            fill
            className="object-cover object-center"
          />
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
    </div>
  );
};
