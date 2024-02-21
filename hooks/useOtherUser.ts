import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

const useOtherUser = (
  conversation: FullConversationType | { user: User[] }
) => {
  const session = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session.data?.user?.email;

    if (!currentUserEmail) {
      return null;
    }

    const otherUser = conversation.user.filter(
      (user) => user.email !== currentUserEmail
    );

    console.log("otherUser: ", otherUser);

    return otherUser[0];
  }, [session.data?.user?.email, conversation.user]);

  return otherUser;
};

export default useOtherUser;
