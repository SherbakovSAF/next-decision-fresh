import { User_M } from "@prisma/client";

export type UserMinDTO_I = Omit<
  User_M,
  "id" | "refreshToken" | "updatedAt" | "password"
>;
