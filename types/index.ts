import { User, Message, Conversation, BlockedUser } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  user: User[];
  messages: FullMessageType[];
};

export type ProfileBoxType = {
  name: string;
  nickname: string;
  image: string | null;
};

export type BlockedUserWithProfileBlocked = BlockedUser & {
  userBlocked: User;
};
