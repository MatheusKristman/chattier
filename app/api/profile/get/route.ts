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
        email: session.user?.email,
      },
      include: {
        conversations: true,
      },
    });

    if (!user) {
      return new NextResponse("Usuário não localizado", { status: 404 });
    }

    return NextResponse.json({
      name: user.name,
      nickname: user.nickname,
      image: user.image,
      conversations: user.conversations,
    });
  } catch (error) {
    console.log("[ERROR_GET_PROFILE]", error);
    return new NextResponse(
      "Ocorreu um erro na solicitação dos dados do usuário",
      { status: 500 },
    );
  }
}
