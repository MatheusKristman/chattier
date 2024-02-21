import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { name, email } = await body;

    if (!name || !email) {
      return new NextResponse("Dados inválidos, verifique e tente novamente", {
        status: 401,
      });
    }

    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
      },
    });

    if (!user) {
      return new NextResponse("usuário Não encontrado", { status: 404 });
    }

    return NextResponse.json(name, { status: 200 });
  } catch (error) {
    console.log("[UPDATE-NAME-ERROR]", error);
    return new NextResponse("Ocorreu um erro na atualização do nome", {
      status: 500,
    });
  }
}
