"use client";

import { Button } from "@/components/ui/button";
import { LogOut, Plus, X } from "lucide-react";
import Image from "next/image";
import { BlockedProfileBox } from "./blocked-profile-box";
import useContactStore from "@/stores/use-contact-store";

export const ProfileModal = () => {
  const { isProfileModalOpen, closeProfileModal } = useContactStore();

  return (
    <>
      {isProfileModalOpen && (
        <div className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
          <div className="w-full max-w-[700px] bg-gray-secondary px-9 py-6 rounded-[30px] inline-block align-middle">
            <div className="flex justify-end">
              <Button
                onClick={closeProfileModal}
                className="bg-transparent hover:bg-transparent"
              >
                <X size="40px" strokeWidth="1.5" color="#FFFFFF" />
              </Button>
            </div>

            <div className="w-full flex justify-center mb-9">
              <div className="flex flex-col items-center gap-y-9">
                <div
                  role="button"
                  className="w-[140px] min-w-[140px] max-w-[140px] h-[140px] min-h-[140px] max-h-[140px] bg-gray-primary rounded-full flex items-center justify-center"
                >
                  <Plus size="80px" strokeWidth="0.5" color="#202730" />
                </div>

                <div className="flex flex-col gap-y-2 items-center">
                  <div className="px-2 py-1 bg-gray-primary flex items-center justify-center rounded-lg">
                    <h4 className="text-2xl text-white font-semibold text-center">
                      John Doe
                    </h4>
                  </div>

                  <span className="text-base text-white font-semibold">
                    @johndoe
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-8 mb-12">
              <h5 className="text-left text-lg text-white font-semibold">
                Contatos Bloqueados
              </h5>

              <div className="w-full flex flex-col gap-y-9">
                <BlockedProfileBox />
              </div>
            </div>

            <div className="w-full flex justify-center">
              <Button className="w-2/4 bg-white space-x-2 rounded-[30px] hover:bg-white hover:shadow-lg hover:shadow-[#b64862] transition-shadow">
                <LogOut color="#F85C7F" />
                <span className="text-gradient">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
