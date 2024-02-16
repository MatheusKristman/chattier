import getConversations from "@/actions/getConversations";
import { Contacts } from "../components/contacts";
import { Conversation } from "./components/conversation";
import getConversationById from "@/actions/getConversationById";
import getUsers from "@/actions/getUsers";
import getMessages from "@/actions/getMessages";
import { ChatIllustration } from "../components/chat-illustration";
import getBlockedUser from "@/actions/getBlockedUser";

const ConversationPage = async ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversations = await getConversations();
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  const users = await getUsers();
  const { blockedUsers } = await getBlockedUser();

  if (!conversation) {
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
  }

  const { isOtherUserBlocked } = await getBlockedUser(conversation);

  if (isOtherUserBlocked === undefined) {
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
  }

  return (
    <>
      <Contacts
        initialConversations={conversations}
        newContacts={users}
        conversationParams={params}
        blockedUsers={blockedUsers}
      />
      <Conversation
        conversation={conversation}
        initialMessages={messages}
        isOtherUserBlocked={isOtherUserBlocked}
        conversationParams={params}
      />
    </>
  );
};

export default ConversationPage;
