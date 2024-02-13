import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { conversationId } = await body;

    const session = await getServerSession();

    if (!conversationId) {
      return new NextResponse("Dados invalidos", { status: 400 });
    }

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

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        user: {
          where: {
            id: {
              not: user.id,
            },
          },
        },
      },
    });

    if (!conversation || conversation.user.length === 0) {
      return new NextResponse("Conversa não encontrada", { status: 404 });
    }

    const blockedUser = await prisma.blockedUser.create({
      data: {
        blockedById: user.id,
        userBlockedId: conversation.user[0].id,
      },
      include: {
        blockedBy: true,
        userBlocked: true,
      },
    });

    return NextResponse.json(
      {
        message: "Usuário bloqueado com sucesso",
        user: blockedUser.blockedBy,
        otherUser: blockedUser.userBlocked,
        blockedUser: [blockedUser],
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[ERROR_BLOCK_USER]", error);

    return new NextResponse("Ocorreu um erro durante o bloqueio do perfil", {
      status: 500,
    });
  }
}
