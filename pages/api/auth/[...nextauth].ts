import NextAuth from "next-auth/next";
import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";

import prisma from "@/lib/db";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Credenciais inválidas");
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (!user || !user?.hashedPassword) {
            throw new Error("Credenciais inválidas");
          }

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (!isCorrectPassword) {
            throw new Error("Credenciais inválidas");
          }

          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (trigger === "update" && session?.image) {
        token.picture = session.image;
      }

      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/",
  },
  debug: true,
};

export default NextAuth(authOptions);
