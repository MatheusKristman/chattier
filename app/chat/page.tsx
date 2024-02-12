"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";

import { Contacts } from "./components/contacts";
import { ChatIllustration } from "./components/chat-illustration";
import useUserStore from "@/stores/use-user-store";
import { Conversation } from "@prisma/client";

const ChatPage = () => {
  const { setName, setNickname, setImage } = useUserStore();

  const [conversations, setConversations] = useState<Conversation[]>([]);

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
      <Contacts conversations={conversations} />
      <ChatIllustration />
    </>
  );
};

export default ChatPage;
