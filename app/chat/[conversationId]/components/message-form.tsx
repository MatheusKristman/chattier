"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useConversationStore from "@/stores/use-conversation-store";

export const MessageForm = () => {
  const { openGallery } = useConversationStore();

  return (
    <div className="w-full px-6 py-4 flex items-center justify-between gap-x-6 bg-gray-secondary rounded-2xl">
      <Button size="icon" variant="link" onClick={openGallery}>
        <span className="w-10 h-10 bg-gallery-icon bg-no-repeat bg-contain bg-center" />
      </Button>

      <Input
        placeholder="Digite sua mensagem"
        className="bg-transparent border-none outline-none text-base text-white"
      />

      <Button size="icon" variant="link">
        <span className="w-10 h-10 bg-send-message-icon bg-no-repeat bg-contain bg-center" />
      </Button>
    </div>
  );
};
