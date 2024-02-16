import { NextResponse } from "next/server";

import prisma from "@/lib/db";
import getSession from "@/actions/getSession";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { blockedUserId } = await body;
    const session = await getSession();

    if (!session || !session.user?.email || !blockedUserId) {
      return new NextResponse("Não autorizado", { status: 401 });
    }

    await prisma.blockedUser.delete({
      where: {
        id: blockedUserId,
      },
    });

    return NextResponse.json(
      { message: "Perfil desbloqueado" },
      { status: 200 },
    );
  } catch (error) {
    console.log("[ERROR_UNBLOCK_USER]", error);

    return new NextResponse("Ocorreu um erro ao desbloquear o perfil", {
      status: 500,
    });
  }
}
