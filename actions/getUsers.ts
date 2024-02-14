import getCurrentUser from "./getCurrentUser";
import prisma from "@/lib/db";

const getUsers = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        id: {
          not: currentUser.id,
        },
        NOT: {
          conversations: {
            some: {
              userIds: {
                has: currentUser.id,
              },
            },
          },
        },
      },
    });

    return users;
  } catch (error) {
    return [];
  }
};

export default getUsers;
