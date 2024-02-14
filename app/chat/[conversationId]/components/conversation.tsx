import { BlockedUser } from "@prisma/client";
import { ConversationHeader } from "./conversation-header";
import { MessageForm } from "./message-form";
import { MessagesBox } from "./messages-box";
import { SendImageModal } from "./send-image-modal";
import { Dispatch, SetStateAction } from "react";

interface ConversationProps {
  conversationId: string;
  blockedUsers: BlockedUser[];
  setBlockedUsers: Dispatch<SetStateAction<BlockedUser[]>>;
}

export const Conversation = ({
  conversationId,
  blockedUsers,
  setBlockedUsers,
}: ConversationProps) => {
  return (
    <div className="w-full h-screen px-6 py-9 flex flex-col sm:px-16 lg:w-[calc(100%-450px)]">
      <ConversationHeader
        conversationId={conversationId}
        blockedUsers={blockedUsers}
        setBlockedUsers={setBlockedUsers}
      />
      <MessagesBox />
      <MessageForm />
      <SendImageModal />
    </div>
  );
};
