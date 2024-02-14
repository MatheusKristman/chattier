import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { conversationId } = await body;

    const session = await getServerSession();

    if (!conversationId) {
      return new NextResponse("Dados inválidos", { status: 400 });
    }

    if (!session || !session.user?.email) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        blockedUser: true,
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

    const userWhoGotBlocked = user.blockedUser.filter(
      (block) => block.userBlockedId === conversation.user[0].id,
    )[0];

    await prisma.blockedUser.delete({
      where: {
        id: userWhoGotBlocked.id,
      },
      include: {
        blockedBy: true,
        userBlocked: true,
      },
    });

    const updatedUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        blockedUser: true,
      },
    });

    if (!updatedUser) {
      return new NextResponse("Usuário Não atualizado", { status: 404 });
    }

    return NextResponse.json({
      message: "Usuário Desbloqueado com Sucesso",
      user: updatedUser,
      otherUser: conversation.user[0],
      blockedUser: updatedUser.blockedUser,
    });
  } catch (error) {
    console.log("[ERROR_UNBLOCK_USER]", error);

    return new NextResponse(
      "Ocorreu um erro durante o processo de desbloqueio do perfil",
      { status: 500 },
    );
  }
}
