"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import axios from "axios";

import { Contacts } from "./components/contacts";
import { ChatIllustration } from "./components/chat-illustration";
import useUserStore from "@/stores/use-user-store";

const ChatPage = () => {
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
      <Contacts />
      <ChatIllustration />
    </>
  );
};

export default ChatPage;
