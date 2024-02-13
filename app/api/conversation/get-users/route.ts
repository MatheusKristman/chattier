import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    console.log(user.id);

    const newConversationsUsers = await prisma.user.findMany({
      where: {
        id: {
          not: user.id,
        },
        NOT: {
          conversations: {
            some: {
              userIds: {
                has: user.id,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(newConversationsUsers, { status: 200 });
  } catch (error) {
    console.log("[ERROR_GET_NEW_CONVERSATIONS_USERS]", error);

    return new NextResponse(
      "Ocorreu um erro ao receber os usuários disponiveis",
      { status: 500 },
    );
  }
}
