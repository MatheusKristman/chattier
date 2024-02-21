"use client";

import { Check, MoreHorizontal, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import Image from "next/image";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types";
import { ImageModal } from "./image-modal";

interface MessageBoxProps {
  otherMessage?: boolean;
  message: FullMessageType;
  isLast?: boolean;
}

export const MessageBox = ({
  otherMessage,
  message,
  isLast,
}: MessageBoxProps) => {
  const { data: session } = useSession();
  const [imageModalOpen, setImageModalOpen] = useState<boolean>(false);
  const [editedMessage, setEditedMessage] = useState<string>(message.content);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const isOwn = session?.user?.email === message.sender.email;
  const seenList = (message.seen || [])
    .filter((user) => user.email !== message?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  function handleEditing() {
    setIsEditing(true);
    setIsPopoverOpen(false);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setIsPopoverOpen(false);
  }

  function handleMessageChange(e: ChangeEvent<HTMLInputElement>) {
    setEditedMessage(e.target.value);
  }

  function handleCloseImageModal() {
    setImageModalOpen(false);
  }

  function handleOpenImageModal() {
    setImageModalOpen(true);
  }

  function submitEdit(message: FullMessageType) {
    if (editedMessage.length === 0) {
      toast.error("Mensagem não pode ser enviada vazia");
      return;
    }

    axios
      .put("/api/messages/edit", { message, editedMessage })
      .then((res) => {
        toast.success(res.data);

        setIsEditing(false);
      })
      .catch((error) => {
        toast.error(error.response.data);

        console.error(error);
      });
  }

  function handlePopover(open: boolean) {
    setIsPopoverOpen(open);
  }

  return (
    <div
      className={cn(
        "w-full flex flex-row-reverse items-center justify-start group",
        {
          "flex-row": otherMessage,
        },
      )}
    >
      <ImageModal
        fileUrl={message.fileUrl}
        isImageModalOpen={imageModalOpen}
        closeModal={handleCloseImageModal}
      />

      {message.fileUrl ? (
        <div
          onClick={handleOpenImageModal}
          className="w-2/3 relative pb-2 xl:w-2/5 cursor-pointer"
        >
          <div
            className={cn(
              "relative w-full aspect-square rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl overflow-hidden",
              {
                "rounded-bl-none rounded-br-3xl": otherMessage,
              },
            )}
          >
            <Image
              src={message.fileUrl}
              alt="Mensagem"
              fill
              className="object-cover object-center transition-all duration-500 hover:scale-125"
            />
          </div>

          <span className="text-white/50 text-[10px]">
            {format(new Date(message.createdAt), "p")}
          </span>
        </div>
      ) : (
        <>
          <div
            className={cn(
              "w-2/3 px-6 relative pt-6 pb-2 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl bg-[#523BFE] xl:w-2/5",
              {
                "bg-[#131920] rounded-bl-none rounded-br-3xl": otherMessage,
              },
            )}
          >
            {/* TODO ajustar depois para imagens */}
            {isEditing ? (
              <div className="w-full flex flex-col justify-between gap-y-4 lg:flex-row lg:items-center lg:gap-x-4">
                <input
                  type="text"
                  value={editedMessage}
                  onChange={handleMessageChange}
                  className="w-full text-base text-white bg-transparent block outline-none lg:w-1/2"
                />

                <div className="flex items-center justify-end gap-x-2">
                  <Button
                    onClick={handleCancelEditing}
                    variant="link"
                    className="bg-white px-2 w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    {otherMessage ? (
                      <X color="#131920" size="20" />
                    ) : (
                      <X color="#5242fe" size="20" />
                    )}
                  </Button>

                  <Button
                    onClick={() => submitEdit(message)}
                    variant="link"
                    className="bg-white px-2 w-10 h-10 rounded-full flex items-center justify-center"
                  >
                    {otherMessage ? (
                      <Check color="#131920" size="20" />
                    ) : (
                      <Check color="#5242fe" size="20" />
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-base text-white">{message.content}</p>
            )}

            {/* TODO criar componente para mensagem visualizada */}
            <span className="text-white/50 text-[10px]">
              {format(new Date(message.createdAt), "p")}
            </span>
          </div>

          {!otherMessage ? (
            <Popover open={isPopoverOpen} onOpenChange={handlePopover}>
              <PopoverTrigger className="mr-6 transition-opacity opacity-0 group-hover:opacity-100">
                <MoreHorizontal color="#FFFFFF" />
              </PopoverTrigger>

              <PopoverContent
                align="end"
                className="bg-[#212A35] border-none rounded-xl rounded-tr-none space-y-6"
              >
                {isEditing ? (
                  <Button
                    variant="destructive"
                    onClick={handleCancelEditing}
                    className="w-full text-base font-semibold"
                  >
                    Cancelar Edição de mensagem
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleEditing}
                      className="bg-[#6E80F7] hover:bg-[#6E80F7]/90 w-full text-base font-semibold"
                    >
                      Editar mensagem
                    </Button>

                    <Button
                      variant="destructive"
                      className="w-full text-base font-semibold"
                    >
                      Apagar mensagem
                    </Button>
                  </>
                )}
              </PopoverContent>
            </Popover>
          ) : null}
        </>
      )}
    </div>
  );
};
