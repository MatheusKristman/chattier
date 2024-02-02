import { Contacts } from "../components/contacts";
import { Conversation } from "./components/conversation";

const ConversationPage = ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversationId = params.conversationId;

  return (
    <>
      <Contacts conversationId={conversationId} />
      <Conversation />
    </>
  );
};

export default ConversationPage;
