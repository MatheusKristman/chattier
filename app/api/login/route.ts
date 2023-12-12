import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return new Response("Credenciais inválidas", { status: 401 });
        }

        const userExists = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!userExists) {
            return new Response("Usuário não encontrado", { status: 404 });
        }

        const isPasswordCorrect = await bcrypt.compare(password, userExists.hashedPassword);

        if (!isPasswordCorrect) {
            return new Response("Credenciais inválidas", { status: 401 });
        }

        return Response.json({ email, password });
    } catch (error) {
        console.log("[ERROR_LOGIN]", error);
        return new Response("Ocorreu um erro no acesso, verifique e tente novamente", {
            status: 500,
        });
    }
}
