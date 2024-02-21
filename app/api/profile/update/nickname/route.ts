import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { nickname, email } = await body;

    if (!nickname || !email) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const usersWithNickname = await prisma.user.findMany({
      where: {
        nickname,
      },
    });

    if (usersWithNickname.length > 0) {
      return new NextResponse("Nickname já esta em uso, utilize outro", {
        status: 401,
      });
    }

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        nickname,
      },
    });

    if (!user) {
      return new NextResponse("usuário Não encontrado", { status: 404 });
    }

    return NextResponse.json(nickname, { status: 200 });
  } catch (error) {
    console.log("[UPDATE-NAME-ERROR]", error);
    return new NextResponse("Ocorreu um erro na atualização do nome", {
      status: 500,
    });
  }
}
