"use client";

import { Button } from "@/components/ui/button";
import useContactStore from "@/stores/use-contact-store";

export const NewConversationButton = () => {
  const { openNewConversationModal } = useContactStore();

  return (
    <>
      <Button
        onClick={openNewConversationModal}
        className="bg-colored-primary w-full h-12 text-lg font-medium text-white rounded-xl transition-opacity hover:opacity-80"
      >
        Iniciar nova conversa
      </Button>
    </>
  );
};
