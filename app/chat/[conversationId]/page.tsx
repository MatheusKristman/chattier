"use client";

import useUserStore from "@/stores/use-user-store";
import { Contacts } from "../components/contacts";
import { Conversation } from "./components/conversation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Conversation as ConversationType } from "@prisma/client";

const ConversationPage = ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversationId = params.conversationId;

  const { setName, setNickname, setImage } = useUserStore();

  const [conversations, setConversations] = useState<ConversationType[]>([]);

  useEffect(() => {
    axios
      .get("/api/profile/get")
      .then((res) => {
        setName(res.data.name);
        setNickname(res.data.nickname);
        setImage(res.data.image);
        setConversations(res.data.conversations);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Contacts conversations={conversations} conversationId={conversationId} />
      <Conversation conversationId={conversationId} />
    </>
  );
};

export default ConversationPage;
