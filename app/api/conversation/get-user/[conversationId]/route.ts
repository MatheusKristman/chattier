import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { conversationId: string } },
) {
  try {
    const session = await getServerSession();
    console.log(params);
    const conversationId = params.conversationId;

    if (!session || !session.user?.email || !conversationId) {
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

    const conversation = await prisma.conversation.findFirst({
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
        messages: {
          where: {
            senderId: {
              not: user.id,
            },
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Conversa não localizada", { status: 404 });
    }

    console.log(conversation);

    const lastMessage =
      conversation.messages[conversation.messages.length - 1] || [];

    console.log(lastMessage);

    return NextResponse.json(
      { otherUser: conversation.user[0], lastMessage },
      { status: 200 },
    );
  } catch (error) {
    console.error("[ERROR_GET_USER]", error);

    return new NextResponse("Ocorreu um erro durante a busca do usuário", {
      status: 500,
    });
  }
}
