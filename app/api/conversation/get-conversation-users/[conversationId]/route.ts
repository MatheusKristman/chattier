import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { conversationId: string } },
) {
  try {
    const conversationId = params.conversationId;
    const session = await getServerSession();

    if (!conversationId || !session || !session.user?.email) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const conversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        user: {
          select: {
            image: true,
            name: true,
            id: true,
            email: true,
          },
        },
      },
    });

    if (!conversation) {
      return new NextResponse("Conversa não localizada", { status: 404 });
    }

    const otherUser = conversation.user.filter(
      (user) => user.email !== session.user?.email,
    )[0];
    const user = conversation.user.filter(
      (user) => user.email === session.user?.email,
    )[0];

    console.log("user", user);

    return NextResponse.json({ user, otherUser }, { status: 200 });
  } catch (error) {
    console.log("[ERROR_GET_CONVERSATION_USERS]", error);

    return new NextResponse(
      "Ocorreu um error na requisição dos usuários da conversa",
      { status: 500 },
    );
  }
}
