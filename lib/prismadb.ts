import { PrismaClient } from "@prisma/client";

let client = global.prismadb || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prismadb = client;
}

export default client;
