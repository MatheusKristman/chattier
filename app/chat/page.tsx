"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { Contacts } from "./components/contacts";
import { ChatIllustration } from "./components/chat-illustration";

const ChatPage = () => {
  return (
    <>
      <Contacts />
      <ChatIllustration />
    </>
  );
};

export default ChatPage;
