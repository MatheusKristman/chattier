import { getServerSession } from "next-auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import prisma from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  profilePhotoUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await getServerSession();

      if (!session || !session?.user) {
        throw new UploadThingError("Não autorizado");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email!,
        },
      });

      if (!user) {
        throw new UploadThingError("Usuário não encontrado");
      }

      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      await prisma.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          image: file.url,
        },
      });

      return {};
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
