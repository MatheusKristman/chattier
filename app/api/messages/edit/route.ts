import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/lib/db";
import { pusherServer } from "@/lib/pusher";

export async function PUT(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Usuário não autorizado", { status: 401 });
    }

    const body = await req.json();
    const { message, editedMessage } = body;

    if (!editedMessage || !message?.id) {
      return new NextResponse("Dados inválidos", { status: 400 });
    }

    const updatedMessage = await prisma.message.update({
      where: {
        id: message.id,
      },
      data: {
        content: editedMessage,
      },
      include: {
        conversations: true,
        sender: true,
        seen: true,
      },
    });

    if (!updatedMessage) {
      return new NextResponse("Erro ao localizar a mensagem", { status: 404 });
    }

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: updatedMessage.conversationId,
      },
      data: {
        lastMessageAt: new Date(),
      },
      include: {
        user: true,
        messages: true,
      },
    });

    if (!updatedConversation) {
      return new NextResponse("Erro ao localizar a conversa", { status: 404 });
    }

    const lastMessage =
      updatedConversation.messages[updatedConversation.messages.length - 1];

    updatedConversation.user.forEach((user) => {
      pusherServer.trigger(user.email, "conversation:update", {
        id: updatedConversation.id,
        messages: [lastMessage],
      });
    });

    await pusherServer.trigger(
      updatedConversation.id,
      "message:update",
      updatedMessage,
    );

    return new NextResponse("Mensagem editada com sucesso", { status: 200 });
  } catch (error) {
    console.log("[ERROR_EDIT_MESSAGE]", error);

    return new NextResponse("Ocorreu um erro ao editar a mensagem", {
      status: 500,
    });
  }
}
