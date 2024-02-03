"use client";

import { Loader2, LogOut, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useUploadThing, uploadFiles } from "@/lib/uploadthing";

import { Button } from "@/components/ui/button";
import { BlockedProfileBox } from "./blocked-profile-box";
import useContactStore from "@/stores/use-contact-store";
import { UploadButton } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export const ProfileModal = () => {
  const { data: session, update } = useSession();
  const { isProfileModalOpen, closeProfileModal } = useContactStore();
  const { startUpload, isUploading } = useUploadThing("profilePhotoUploader", {
    onClientUploadComplete: async (res) => {
      toast.success("Foto de perfil atualizada com sucesso");

      setProfilePhotoURL(res[0].url);
      setProfilePhoto(null);

      update({ image: res[0].url });

      if (fileInput.current) {
        fileInput.current.value = "";
      }
    },
    onUploadError: () => {
      toast.error(
        "Ocorreu um erro durante o envio da foto de perfil, tente novamente mais tarde"
      );
    },
  });
  const fileInput = useRef<HTMLInputElement | null>(null);

  console.log(session);

  const [isSendingImage, setIsSendingImage] = useState<boolean>(false);
  const [profilePhoto, setProfilePhoto] = useState<File[] | null>(null);
  const [profilePhotoURL, setProfilePhotoURL] = useState<string>("");

  useEffect(() => {
    console.log(profilePhoto);
    console.log(profilePhotoURL);
  }, [profilePhoto, profilePhotoURL]);

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    setIsSendingImage(true);

    if (!event.target.files) {
      return;
    }

    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file && file.type.startsWith("image/")) {
      setProfilePhotoURL(URL.createObjectURL(file));
      setProfilePhoto([file]);
      setIsSendingImage(false);
      return;
    }

    toast.error("Formato da image é inválido");

    setIsSendingImage(false);
  }

  return (
    <>
      {isProfileModalOpen && (
        <div className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
          <div className="w-full max-w-[700px] bg-gray-secondary px-9 py-6 rounded-[30px] inline-block align-middle">
            <div className="flex justify-end">
              <Button
                onClick={closeProfileModal}
                disabled={isUploading}
                className="bg-transparent hover:bg-transparent"
              >
                <X size="40px" strokeWidth="1.5" color="#FFFFFF" />
              </Button>
            </div>

            <div className="w-full flex justify-center mb-9">
              <div className="flex flex-col items-center gap-y-9">
                <div className="flex flex-col items-center gap-y-4">
                  <label
                    htmlFor="profilePhoto"
                    className="relative cursor-pointer w-[140px] min-w-[140px] max-w-[140px] h-[140px] min-h-[140px] max-h-[140px] bg-gray-primary rounded-full overflow-hidden flex items-center justify-center"
                  >
                    {profilePhoto || profilePhotoURL ? (
                      <Image
                        src={profilePhotoURL}
                        alt="Foto de perfil"
                        fill
                        className="object-cover object-center"
                      />
                    ) : session?.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt="Foto de perfil"
                        fill
                        className="object-cover object-center"
                      />
                    ) : (
                      <Plus size="80px" strokeWidth="0.5" color="#202730" />
                    )}
                  </label>

                  <input
                    ref={fileInput}
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    className="hidden"
                    disabled={isUploading}
                    onChange={(event) => handleImage(event)}
                  />

                  {profilePhoto ? (
                    <div className="flex items-center gap-x-4">
                      <Button
                        onClick={() => startUpload(profilePhoto)}
                        disabled={isUploading}
                        className={cn(
                          "bg-colored-primary text-base text-white font-semibold",
                          { "opacity-70": isUploading }
                        )}
                      >
                        {isUploading ? (
                          <>
                            <span className="mr-2">Mudando Foto</span>
                            <Loader2 className="animate-spin" />
                          </>
                        ) : (
                          "Mudar Foto"
                        )}
                      </Button>

                      <Button disabled={isUploading} variant="destructive">
                        <Trash2 color="#FFFFFF" />
                      </Button>
                    </div>
                  ) : null}
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
              <Button
                disabled={isUploading}
                className="w-2/4 bg-white space-x-2 rounded-[30px] hover:bg-white hover:shadow-lg hover:shadow-[#b64862] transition-shadow"
              >
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
