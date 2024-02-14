import { Contacts } from "./components/contacts";
import { ChatIllustration } from "./components/chat-illustration";
import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";

const ChatPage = async () => {
  const conversations = await getConversations();
  const users = await getUsers();

  return (
    <>
      <Contacts initialConversations={conversations} newContacts={users} />
      <ChatIllustration />
    </>
  );
};

export default ChatPage;
