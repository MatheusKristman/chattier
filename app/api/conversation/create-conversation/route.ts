import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { otherUserId } = await body;
    const session = await getServerSession();

    if (!otherUserId) {
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

    const otherUser = await prisma.user.findUnique({
      where: {
        id: otherUserId,
      },
    });

    if (!otherUser) {
      return new NextResponse("Usuário não encontrado", { status: 404 });
    }

    const newConversation = await prisma.conversation.create({
      data: {
        user: {
          connect: [
            {
              id: user.id,
            },
            {
              id: otherUser.id,
            },
          ],
        },
      },
      include: {
        user: true,
      },
    });

    if (!newConversation) {
      return new NextResponse("Ocorreu um erro na criação da conversa", {
        status: 401,
      });
    }

    newConversation.user.forEach((user) => {
      if (user.email) {
        pusherServer.trigger(user.email, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation, { status: 200 });
  } catch (error) {
    console.log("[ERROR_CREATE_CONVERSATION]", error);

    return new NextResponse("Ocorreu um erro na criação da conversa", {
      status: 500,
    });
  }
}
