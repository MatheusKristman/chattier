import { NextResponse } from "next/server";

import getSession from "@/actions/getSession";
import { NextApiRequest, NextApiResponse } from "next";
import { pusherServer } from "@/lib/pusher";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getSession();
  if (!session?.user?.email) {
    return new NextResponse("Usuário não autorizado", { status: 401 });
  }

  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const data = {
    user_id: session.user.email,
  };

  const authResponse = pusherServer.authorizeChannel(socketId, channel, data);
  return res.send(authResponse);
}
