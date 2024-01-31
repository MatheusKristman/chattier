import { Dot } from "lucide-react";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ConversationBox } from "./conversation-box";
import Link from "next/link";

export const Contacts = () => {
  return (
    <div className="w-full min-h-screen py-6 px-6 bg-gray-secondary flex flex-col gap-y-12 sm:px-16 lg:w-[450px] lg:px-6">
      <Link href="/" className="w-full flex justify-center items-center">
        <Image src="/images/logo.svg" alt="Chattie" width="150" height="41" />
      </Link>

      <div className="w-full p-5 flex items-center justify-between rounded-xl bg-gray-primary sm:mx-auto sm:max-w-sm lg:max-w-none lg:mx-0">
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

      <div className="w-full flex flex-col gap-y-6">
        <div className="relative">
          <Input
            placeholder="Pesquise uma conversa"
            className="bg-gray-primary rounded-lg w-full h-12 placeholder:text-gray-600 text-base border-none pl-12 text-white"
          />

          <span
            aria-hidden="true"
            className="bg-search-icon bg-no-repeat bg-contain bg-center w-7 h-7 absolute top-1/2 left-2.5 -translate-y-1/2"
          />
        </div>

        <Button className="bg-colored-primary w-full h-12 text-lg font-medium text-white rounded-xl transition-opacity hover:opacity-80">
          Iniciar nova conversa
        </Button>
      </div>

      <div className="w-full flex flex-col gap-y-9">
        <ConversationBox />
      </div>
    </div>
  );
};
