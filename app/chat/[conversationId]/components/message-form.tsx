"use client";

import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { animateScroll as scroll } from "react-scroll";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useConversation from "@/hooks/useConversation";
import useConversationStore from "@/stores/use-conversation-store";

interface MessageFormProps {
  conversationParams?: { conversationId: string };
}

export const MessageForm = ({ conversationParams }: MessageFormProps) => {
  const { openGallery } = useConversationStore();

  const { conversationId } = useConversation(conversationParams);

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
    setValue("message", "", { shouldValidate: true });

    axios
      .post("/api/messages", {
        ...data,
        conversationId,
      })
      .then(() => {
        scroll.scrollToBottom();
      });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full px-6 py-4 flex items-center justify-between gap-x-6 bg-gray-secondary rounded-2xl mt-12"
    >
      <Button type="button" size="icon" variant="link" onClick={openGallery}>
        <span className="w-10 h-10 bg-gallery-icon bg-no-repeat bg-contain bg-center" />
      </Button>

      <Input
        {...register("message")}
        placeholder="Digite sua mensagem"
        className="bg-transparent border-none outline-none text-base text-white"
      />

      <Button type="submit" size="icon" variant="link">
        <span className="w-10 h-10 bg-send-message-icon bg-no-repeat bg-contain bg-center" />
      </Button>
    </form>
  );
};
