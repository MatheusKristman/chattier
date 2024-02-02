import { Button } from "@/components/ui/button";
import Image from "next/image";

export const NewContactBox = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center justify-center gap-x-5">
        <div className="relative w-14 min-w-[56px] max-w-[56px] h-14 min-h-[56px] max-h-[56px] rounded-full overflow-hidden flex items-center justify-center">
          <Image
            src="/images/profile-test.png"
            alt="Nome do usuário"
            fill
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col gap-y-1">
          <h4 className="text-white text-lg font-semibold">John Doe</h4>
        </div>
      </div>

      <Button
        size="lg"
        className="bg-white rounded-lg hover:bg-white hover:shadow-lg hover:shadow-[#b64862] transition-shadow"
      >
        <span className="text-gradient">Conversar</span>
      </Button>
    </div>
  );
};
