"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { Contacts } from "./components/contacts";
import { ChatIllustration } from "./components/chat-illustration";

const ChatPage = () => {
  return (
    <section className="w-full flex">
      <Contacts />
      <ChatIllustration />
    </section>
  );
};

export default ChatPage;
