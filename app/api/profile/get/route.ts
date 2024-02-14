import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: currentUser.email,
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
    });
  } catch (error) {
    console.log("[ERROR_GET_PROFILE]", error);
    return new NextResponse(
      "Ocorreu um erro na solicitação dos dados do usuário",
      { status: 500 },
    );
  }
}
