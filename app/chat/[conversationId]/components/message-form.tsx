"use client";

import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useConversation from "@/hooks/useConversation";
import useConversationStore from "@/stores/use-conversation-store";
import { Skeleton } from "@/components/ui/skeleton";

interface MessageFormProps {
  conversationParams?: { conversationId: string };
  isOtherUserBlocked: boolean;
}

export const MessageForm = ({
  conversationParams,
  isOtherUserBlocked,
}: MessageFormProps) => {
  const { openGallery } = useConversationStore();
  const { conversationId } = useConversation(conversationParams);
  const { status } = useSession();

  const [isSendingMessage, setIsSendingMessage] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(data: FieldValues) {
    setIsSendingMessage(true);
    setValue("message", "", { shouldValidate: true });

    axios
      .post("/api/messages", {
        ...data,
        conversationId,
      })
      .finally(() => {
        setIsSendingMessage(false);
      });
  }

  if (status === "loading") {
    return <MessageFormSkeleton />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-6 py-4 flex items-center justify-between gap-x-6 bg-gray-secondary rounded-2xl mt-12"
    >
      <Button
        disabled={isSendingMessage || isOtherUserBlocked}
        type="button"
        size="icon"
        variant="link"
        onClick={openGallery}
      >
        <span className="w-10 h-10 bg-gallery-icon bg-no-repeat bg-contain bg-center" />
      </Button>

      <Input
        {...register("message")}
        disabled={isSendingMessage || isOtherUserBlocked}
        placeholder="Digite sua mensagem"
        className="bg-transparent border-none outline-none text-base text-white"
      />

      <Button
        disabled={isSendingMessage || isOtherUserBlocked}
        type="submit"
        size="icon"
        variant="link"
      >
        {isSendingMessage ? (
          <Loader2
            size="40px"
            color="#425061"
            strokeWidth={1}
            className="animate-spin"
          />
        ) : (
          <span className="w-10 h-10 bg-send-message-icon bg-no-repeat bg-contain bg-center" />
        )}
      </Button>
    </form>
  );
};

const MessageFormSkeleton = () => {
  return (
    <div className="block w-full h-[72px] min-h-[72px] rounded-2xl overflow-hidden mt-12">
      <Skeleton className="w-full h-full" />;
    </div>
  );
};
