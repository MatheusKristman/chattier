"use client";

import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NewContactBox } from "./new-contact-box";
import useContactStore from "@/stores/use-contact-store";

export const NewConversationModal = () => {
  const { isNewConversationModalOpen, closeNewConversationModal } =
    useContactStore();

  return (
    <>
      {isNewConversationModalOpen && (
        <div className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
          <div className="w-full max-w-[700px] bg-gray-secondary px-9 py-6 rounded-[30px] inline-block align-middle">
            <div className="flex justify-end mb-9">
              <Button
                onClick={closeNewConversationModal}
                className="bg-transparent hover:bg-transparent"
              >
                <X size="40px" strokeWidth="1.5" color="#FFFFFF" />
              </Button>
            </div>

            <div className="relative mb-12">
              <Input
                placeholder="Pesquise o nome do usuário"
                className="bg-[#161D26] rounded-lg w-full h-12 placeholder:text-[#26313E] text-base border-none pl-12 text-white"
              />

              <span
                aria-hidden="true"
                className="bg-search-icon bg-no-repeat bg-contain bg-center w-7 h-7 absolute top-1/2 left-2.5 -translate-y-1/2"
              />
            </div>

            <div className="w-full flex flex-col gap-y-9">
              <NewContactBox />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
