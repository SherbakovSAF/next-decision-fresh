import { UserMinDTO_I } from "@/types/user.types";
import { User_M } from "@prisma/client";

export const getUserName = (user: UserMinDTO_I | User_M) => {
  const defaultValue = "Друг";
  const { fullName, login } = user;
  if (!user) return defaultValue;
  if (fullName && fullName.length) return fullName;
  if (login && login.length) return login;
  return defaultValue;
};
