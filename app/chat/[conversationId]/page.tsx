"use client";

import useUserStore from "@/stores/use-user-store";
import { Contacts } from "../components/contacts";
import { Conversation } from "./components/conversation";
import { useEffect } from "react";
import axios from "axios";

const ConversationPage = ({
  params,
}: {
  params: { conversationId: string };
}) => {
  const conversationId = params.conversationId;

  const { setName, setNickname, setImage } = useUserStore();

  useEffect(() => {
    axios
      .get("/api/profile/get")
      .then((res) => {
        setName(res.data.name);
        setNickname(res.data.nickname);
        setImage(res.data.image);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <Contacts conversationId={conversationId} />
      <Conversation />
    </>
  );
};

export default ConversationPage;
