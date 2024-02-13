import { ConversationHeader } from "./conversation-header";
import { MessageForm } from "./message-form";
import { MessagesBox } from "./messages-box";
import { SendImageModal } from "./send-image-modal";

interface ConversationProps {
  conversationId: string;
}

export const Conversation = ({ conversationId }: ConversationProps) => {
  return (
    <div className="w-full h-screen px-6 py-9 flex flex-col sm:px-16 lg:w-[calc(100%-450px)]">
      <ConversationHeader conversationId={conversationId} />
      <MessagesBox />
      <MessageForm />
      <SendImageModal />
    </div>
  );
};
