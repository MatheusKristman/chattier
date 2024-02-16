import {
  BlockedUser,
  Conversation as ConversationType,
  Message,
  User,
} from "@prisma/client";
import { ConversationHeader } from "./conversation-header";
import { MessageForm } from "./message-form";
import { MessagesBox } from "./messages-box";
import { SendImageModal } from "./send-image-modal";
import { Dispatch, SetStateAction } from "react";
import { FullMessageType } from "@/types";

interface ConversationProps {
  conversation: ConversationType & {
    user: User[];
  };
  initialMessages: FullMessageType[];
  isOtherUserBlocked: boolean;
  conversationParams?: { conversationId: string };
}

export const Conversation = ({
  conversation,
  initialMessages,
  isOtherUserBlocked,
  conversationParams,
}: ConversationProps) => {
  return (
    <div className="w-full h-screen px-6 py-9 flex flex-col sm:px-16 lg:w-[calc(100%-450px)]">
      <ConversationHeader
        conversation={conversation}
        isOtherUserBlocked={isOtherUserBlocked}
      />
      <MessagesBox
        initialMessages={initialMessages}
        conversationParams={conversationParams}
      />
      <MessageForm conversationParams={conversationParams} />
      <SendImageModal />
    </div>
  );
};
