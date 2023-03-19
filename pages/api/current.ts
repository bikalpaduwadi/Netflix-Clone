import { NextApiRequest, NextApiResponse } from "next";
import { omit } from "lodash";

import serverAuth from "@/lib/serverAuth";
import { User } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await serverAuth(req);

    const userResponse = omit(currentUser, ["hashedPassword", "emailVerified"]);

    return res.status(200).json(userResponse);
  } catch (error) {
    console.log("Error in current api", error);

    return res.status(400).end();
  }
}
