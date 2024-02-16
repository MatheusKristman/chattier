import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/db";

const getBlockedUser = async (
  conversation?: FullConversationType | { user: User[] },
) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return { blockedUsers: [], isOtherUserBlocked: false };
  }

  const currentUserId = currentUser.id;

  const blockedUsers = await prisma.blockedUser.findMany({
    where: {
      blockedById: currentUserId,
    },
    include: {
      userBlocked: true,
    },
  });

  if (!blockedUsers) {
    return { blockedUsers: [], isOtherUserBlocked: false };
  }

  if (conversation) {
    const currentUserEmail = currentUser.email;

    const otherUser = conversation.user.filter(
      (user) => user.email !== currentUserEmail,
    )[0];

    const blockedUsersArr = blockedUsers;

    const isOtherUserBlocked =
      blockedUsersArr.filter(
        (blockeds) => blockeds.userBlockedId === otherUser.id,
      ).length > 0;

    return { blockedUsers, isOtherUserBlocked };
  }

  return { blockedUsers, isOtherUserBlocked: false };
};

export default getBlockedUser;
