import { ProfileModal } from "./components/profile-modal";
import { NewConversationModal } from "./components/new-conversation-modal";

const ChatLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full flex">
      {children}
      <ProfileModal />
      <NewConversationModal />
    </section>
  );
};

export default ChatLayout;
