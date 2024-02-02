"use client";

import useContactStore from "@/stores/use-contact-store";
import Image from "next/image";

// TODO arrumar responsividade da box quando for uma tela muito pequena

export const ProfileBox = () => {
  const { openProfileModal } = useContactStore();

  return (
    <div
      onClick={openProfileModal}
      role="button"
      className="p-5 flex items-center justify-between rounded-xl bg-gray-primary mx-6 sm:mx-auto sm:w-full sm:max-w-sm lg:max-w-none lg:w-auto lg:mx-6"
    >
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
  );
};
