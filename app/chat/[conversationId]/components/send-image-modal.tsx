"use client";

import { useDropzone } from "@uploadthing/react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import {
  boxModalAnimation,
  containerModalAnimation,
} from "@/constants/framer-animation/modal-animation";
import { useUploadThing } from "@/lib/uploadthing";
import useConversationStore from "@/stores/use-conversation-store";

interface SendImageModalProps {
  conversationId: string;
}

export const SendImageModal = ({ conversationId }: SendImageModalProps) => {
  const { isGalleryOpen, closeGallery } = useConversationStore();
  const imageInput = useRef<HTMLInputElement | null>(null);

  const [isSendingImage, setIsSendingImage] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [image, setImage] = useState<File[] | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log("rodei");

    setImage(acceptedFiles);
    setImageUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  const { startUpload, isUploading, permittedFileInfo } = useUploadThing(
    "imageMessage",
    {
      onClientUploadComplete: (res) => {
        setIsSendingImage(true);
        axios
          .post("/api/messages", {
            message: res[0].url,
            image: res[0].url,
            conversationId,
          })
          .then(() => {
            closeGallery();
          })
          .finally(() => {
            setIsSendingImage(false);
          });
      },
    },
  );

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  useEffect(() => {
    console.log(image);
  }, [image]);

  function cancelPhotoChange() {
    if (imageInput.current) {
      imageInput.current.value = "";
    }

    setImageUrl("");
    setImage(null);
  }

  return (
    <AnimatePresence>
      {isGalleryOpen && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={containerModalAnimation}
          className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle"
        >
          <motion.div
            variants={boxModalAnimation}
            className="relative w-full h-[350px] max-w-[700px] bg-[#202730] rounded-[30px] overflow-hidden inline-block align-middle"
          >
            <Button
              disabled={isSendingImage || isUploading}
              onClick={closeGallery}
              variant="link"
              className="absolute right-6 top-6 z-10 bg-white px-2 rounded-full w-[40px] h-p[40px] p-1 hover:bg-white/80"
            >
              <X size="30px" strokeWidth="1.5" color="#202730" />
            </Button>

            {/* quando não tem uma image selecionada */}
            {image && imageUrl ? (
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full">
                <Image
                  src={imageUrl}
                  alt="Nova foto de perfil"
                  fill
                  className="object-cover object-center"
                />

                <div className="absolute bottom-9 left-0 right-0 w-full flex items-center justify-center gap-x-4">
                  <Button
                    disabled={isSendingImage || isUploading}
                    onClick={() => startUpload(image)}
                    className="w-1/2 rounded-[30px] bg-colored-primary text-xl font-medium flex gap-x-2 transition-all hover:brightness-75"
                  >
                    {isSendingImage || isUploading ? (
                      <>
                        <Loader2
                          size={30}
                          color="#FFF"
                          className="animate-spin"
                        />
                        Enviando
                      </>
                    ) : (
                      <>Enviar</>
                    )}
                  </Button>

                  <Button
                    disabled={isSendingImage || isUploading}
                    onClick={cancelPhotoChange}
                    className="rounded-[30px] bg-white hover:bg-white/90 transition-all hover:brightness-75"
                  >
                    <span className="w-6 h-6 bg-trash-icon bg-no-repeat bg-contain bg-center" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full p-9">
                <div
                  {...getRootProps()}
                  className="w-full h-full border-2 border-dashed border-[#131920] rounded-3xl flex flex-col items-center justify-center"
                >
                  <input {...getInputProps()} />

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
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
