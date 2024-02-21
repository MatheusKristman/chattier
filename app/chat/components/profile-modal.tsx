"use client";

import { Loader2, LogOut, Pencil, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useState, useRef, useEffect, Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { signOut, useSession } from "next-auth/react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { BlockedProfileBox } from "./blocked-profile-box";
import useContactStore from "@/stores/use-contact-store";
import { cn } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { BlockedUserWithProfileBlocked, ProfileBoxType } from "@/types";

interface ProfileModalProps {
  currentUser: ProfileBoxType | null;
  setCurrentUser: Dispatch<SetStateAction<ProfileBoxType | null>>;
  blockedUsers: BlockedUserWithProfileBlocked[];
}

export const ProfileModal = ({
  currentUser,
  setCurrentUser,
  blockedUsers,
}: ProfileModalProps) => {
  const { data: session } = useSession();
  const { isProfileModalOpen, closeProfileModal } = useContactStore();
  const { startUpload, isUploading } = useUploadThing("profilePhotoUploader", {
    onClientUploadComplete: async (res) => {
      toast.success("Foto de perfil atualizada com sucesso");

      setCurrentUser((prev) => {
        if (!prev) {
          return null;
        }

        return { ...prev, image: res[0].url };
      });
      setProfilePhotoUrl("");
      setProfilePhoto(null);

      if (fileInput.current) {
        fileInput.current.value = "";
      }
    },
    onUploadError: () => {
      toast.error(
        "Ocorreu um erro durante o envio da foto de perfil, tente novamente mais tarde",
      );
    },
  });

  const fileInput = useRef<HTMLInputElement | null>(null);

  const [isSendingImage, setIsSendingImage] = useState<boolean>(false);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>("");
  const [profilePhoto, setProfilePhoto] = useState<File[] | null>(null);
  const [isNameEditing, setIsNameEditing] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [isNicknameEditing, setIsNicknameEditing] = useState<boolean>(false);
  const [newNickname, setNewNickname] = useState<string>("");

  useEffect(() => {
    if (currentUser?.name && currentUser?.nickname) {
      setNewNickname(currentUser.nickname);
      setNewName(currentUser.name);
    }
  }, [currentUser?.name, currentUser?.nickname]);

  function handleCloselModal() {
    closeProfileModal();
    setIsSendingImage(false);
    setProfilePhoto(null);
    setIsNameEditing(false);
    setIsNicknameEditing(false);
  }

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
      setProfilePhotoUrl(URL.createObjectURL(file));
      setProfilePhoto([file]);
      setIsSendingImage(false);
      return;
    }

    toast.error("Formato da image é inválido");

    setIsSendingImage(false);
  }

  function cancelPhotoChange() {
    if (fileInput.current) {
      fileInput.current.value = "";
    }

    setProfilePhotoUrl("");
    setProfilePhoto(null);
  }

  function handleNameEditing() {
    setIsNameEditing(true);
  }

  function handleNameUpdate() {
    if (newName && newName !== currentUser?.name) {
      axios
        .put("/api/profile/update/name", {
          name: newName,
          email: session?.user?.email,
        })
        .then(async (res) => {
          setCurrentUser((prev) => {
            if (!prev) {
              return null;
            }

            return { ...prev, name: res.data };
          });

          setIsNameEditing(false);
        })
        .catch((error) => {
          toast.error(error.response.data);

          console.error(error);
        });
    } else {
      setIsNameEditing(false);
    }
  }

  function handleNicknameEditing() {
    setIsNicknameEditing(true);
  }

  function handleNicknameUpdate() {
    if (newNickname && newNickname !== currentUser?.nickname) {
      axios
        .put("/api/profile/update/nickname", {
          nickname: newNickname,
          email: session?.user?.email,
        })
        .then((res) => {
          setCurrentUser((prev) => {
            if (!prev) {
              return null;
            }

            return { ...prev, nickname: res.data };
          });

          setIsNicknameEditing(false);
        })
        .catch((error) => console.error(error));
    } else {
      setIsNicknameEditing(false);
    }
  }

  return (
    <>
      {isProfileModalOpen && (
        <div className="w-screen h-screen bg-gray-primary/70 fixed top-0 left-0 right-0 bottom-0 z-50 text-center overflow-auto p-6 after:h-full after:content-[''] after:inline-block after:align-middle">
          <div className="w-full max-w-[700px] bg-gray-secondary px-9 py-6 rounded-[30px] inline-block align-middle">
            <div className="flex justify-end">
              <Button
                onClick={handleCloselModal}
                disabled={isUploading || isSendingImage}
                className="bg-transparent hover:bg-transparent"
              >
                <X size="40px" strokeWidth="1.5" color="#FFFFFF" />
              </Button>
            </div>

            <div className="w-full flex justify-center mb-9">
              <div className="flex flex-col items-center gap-y-9">
                <div className="relative flex flex-col items-center gap-y-4 group">
                  <label
                    htmlFor="profilePhoto"
                    className="relative cursor-pointer w-[140px] min-w-[140px] max-w-[140px] h-[140px] min-h-[140px] max-h-[140px] bg-gray-primary rounded-full overflow-hidden flex items-center justify-center "
                  >
                    {profilePhoto && profilePhotoUrl ? (
                      <Image
                        src={profilePhotoUrl}
                        alt="Foto de perfil"
                        fill
                        className="object-cover object-center group-hover:w-10 group-hover:h-10"
                      />
                    ) : currentUser?.image ? (
                      <Image
                        src={currentUser.image}
                        alt="Foto de perfil"
                        fill
                        className="object-cover object-center"
                      />
                    ) : (
                      <Plus size="80px" strokeWidth="0.5" color="#202730" />
                    )}
                  </label>

                  {!profilePhoto ? (
                    <Pencil
                      color="#0c1014"
                      className="absolute -top-1 -right-1 bg-white rounded-full p-1 transition-opacity opacity-0 group-hover:opacity-100"
                    />
                  ) : null}

                  <input
                    ref={fileInput}
                    type="file"
                    id="profilePhoto"
                    name="profilePhoto"
                    className="hidden"
                    disabled={isUploading || isSendingImage}
                    onChange={(event) => handleImage(event)}
                  />

                  {profilePhoto ? (
                    <div className="flex items-center gap-x-4">
                      <Button
                        onClick={() => startUpload(profilePhoto)}
                        disabled={isUploading || isSendingImage}
                        className={cn(
                          "bg-colored-primary text-base text-white font-semibold",
                          { "opacity-70": isUploading },
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

                      <Button
                        onClick={cancelPhotoChange}
                        disabled={isUploading || isSendingImage}
                        variant="destructive"
                      >
                        <Trash2 color="#FFFFFF" />
                      </Button>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-y-2 items-center">
                  <div
                    role="button"
                    onClick={handleNameEditing}
                    className="relative px-2 py-1 bg-gray-primary flex items-center justify-center rounded-lg cursor-pointer group"
                  >
                    {isNameEditing ? (
                      <input
                        type="text"
                        autoComplete="on"
                        autoCorrect="on"
                        value={newName}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setNewName(event.target.value)}
                        onBlur={() => handleNameUpdate()}
                        autoFocus
                        className="w-40 flex bg-transparent text-2xl text-white font-semibold text-center focus-visible:outline-none"
                      />
                    ) : (
                      <>
                        <h4 className="text-2xl text-white font-semibold text-center">
                          {currentUser?.name}
                        </h4>
                        <Pencil
                          color="#0c1014"
                          className="absolute -top-1 -right-1 bg-white rounded-full p-1 transition-opacity opacity-0 group-hover:opacity-100"
                        />
                      </>
                    )}
                  </div>

                  <span
                    role="button"
                    onClick={handleNicknameEditing}
                    className={cn(
                      "relative px-2 py-1 rounded text-base text-white font-semibold transition-opacity cursor-pointer hover:bg-gray-primary/80 group",
                      { "bg-gray-primary/80": isNicknameEditing },
                    )}
                  >
                    {isNicknameEditing ? (
                      <input
                        type="text"
                        autoComplete="on"
                        autoCorrect="on"
                        value={newNickname}
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>,
                        ) => setNewNickname(event.target.value)}
                        onBlur={() => handleNicknameUpdate()}
                        autoFocus
                        className="w-28 flex bg-transparent text-base text-white font-semibold text-center focus-visible:outline-none"
                      />
                    ) : (
                      <>
                        @{currentUser?.nickname}
                        <Pencil
                          color="#0c1014"
                          className="absolute -top-1 -right-1 bg-white rounded-full p-1 transition-opacity opacity-0 group-hover:opacity-100"
                        />
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-8 mb-12">
              <h5 className="text-left text-lg text-white font-semibold">
                Contatos Bloqueados
              </h5>

              <div className="w-full flex flex-col gap-y-9">
                {blockedUsers.length > 0 ? (
                  blockedUsers.map((user) => (
                    <BlockedProfileBox
                      key={user.id}
                      isUploading={isUploading}
                      isSendingImage={isSendingImage}
                      imageSrc={user.userBlocked.image}
                      name={user.userBlocked.name}
                      blockedUserId={user.id}
                    />
                  ))
                ) : (
                  <div className="w-full flex items-center justify-center">
                    <span className="text-xl font-semibold text-slate-600">
                      Nenhum contato bloqueado
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full flex justify-center">
              <Button
                onClick={() => signOut()}
                disabled={isUploading || isSendingImage}
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
