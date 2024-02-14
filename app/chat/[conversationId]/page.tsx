import getConversations from "@/actions/getConversations";
import { Contacts } from "../components/contacts";
import { Conversation } from "./components/conversation";

const ConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversations = await getConversations();

  return (
    <>
      <Contacts
        initialConversations={conversations}
        conversationParams={params}
      />
      {/* <Conversation */}
      {/*   conversationParams={conversationId} */}
      {/*   blockedUsers={blockedUsers} */}
      {/*   setBlockedUsers={setBlockedUsers} */}
      {/* /> */}
    </>
  );
};

export default ConversationPage;
