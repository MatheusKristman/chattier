import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, nickname, email, password, passwordConfirm } =
      body;

    if (!firstName || !lastName || !email || !password || !passwordConfirm) {
      return new Response(
        "Informações inválidas, verifique e tente novamente",
        {
          status: 401,
        }
      );
    }

    if (password !== passwordConfirm) {
      return new Response("Senhas não coincidem, verifique e tente novamente", {
        status: 401,
      });
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      return new Response("Usuário já está cadastrado", { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        nickname: nickname
          ? nickname
          : `@${firstName.toLowerCase()}${lastName.toLowerCase()}`,
        email,
        name: `${firstName} ${lastName}`,
        hashedPassword,
      },
    });

    return Response.json({ email: newUser.email, password });
  } catch (error) {
    console.log("[ERROR_REGISTER]", error);

    return new Response("Ocorreu um erro durante o cadastro", { status: 500 });
  }
}
