import { PrismaClient } from "@prisma/client";

// * Connect to db (sqlite)
export const db = new PrismaClient();
