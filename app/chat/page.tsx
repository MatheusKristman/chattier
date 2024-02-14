import { Contacts } from "./components/contacts";
import { ChatIllustration } from "./components/chat-illustration";
import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import getBlockedUser from "@/actions/getBlockedUser";

const ChatPage = async () => {
  const conversations = await getConversations();
  const users = await getUsers();
  const { blockedUsers } = await getBlockedUser();

  return (
    <>
      <Contacts
        initialConversations={conversations}
        newContacts={users}
        blockedUsers={blockedUsers}
      />
      <ChatIllustration />
    </>
  );
};

export default ChatPage;
