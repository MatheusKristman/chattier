"use client";

import { Button } from "@/components/ui/button";
import useConversationStore from "@/stores/use-conversation-store";
import { Trash2, X } from "lucide-react";
import Image from "next/image";

export const SendImageModal = () => {
  const { isGalleryOpen, closeGallery } = useConversationStore();

  return (
    <>
      {isGalleryOpen && (
        <div className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
          <div className="relative w-full h-[350px] max-w-[700px] bg-[#202730] rounded-[30px] overflow-hidden inline-block align-middle">
            <Button
              onClick={closeGallery}
              variant="link"
              className="absolute right-6 top-6 z-10 bg-white px-2 rounded-full w-[40px] h-p[40px] p-1 hover:bg-white/80"
            >
              <X size="30px" strokeWidth="1.5" color="#202730" />
            </Button>

            {/* quando não tem uma image selecionada */}
            <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full p-9">
              <div className="w-full h-full border-2 border-dashed border-[#131920] rounded-3xl flex flex-col items-center justify-center">
                <Image
                  src="/images/send-image-bg.svg"
                  alt="Mande sua imagem"
                  width={90}
                  height={75}
                  className="object-contain object-center mb-9"
                />

                <span className="mb-4 text-2xl font-semibold text-white">
                  Arraste a imagem aqui, ou{" "}
                  <strong className="text-gradient text-2xl">clique</strong>
                </span>

                <span className="text-white/50 text-lg">
                  Suporte JPG, PNG - 10ML
                </span>
              </div>
            </div>

            {/* quando tiver uma image selecionada */}
            {/* <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
          <Image
          src="/images/change-profile-test.jpg"
            alt="Nova foto de perfil"
            fill
            className="object-cover object-center"
          />
          
          <div className="absolute bottom-9 left-0 right-0 w-full flex items-center justify-center gap-x-4">
            <Button className="w-1/2 rounded-[30px] bg-colored-primary text-xl font-medium">
            Enviar
            </Button>
            
            <Button className="rounded-[30px] bg-white hover:bg-white/90">
              <span className="w-6 h-6 bg-trash-icon bg-no-repeat bg-contain bg-center" />
            </Button>
          </div>
        </div> */}
          </div>
        </div>
      )}
    </>
  );
};
