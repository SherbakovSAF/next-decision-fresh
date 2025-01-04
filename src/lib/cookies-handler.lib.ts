import { NextRequest } from "next/server";
import { verifyJWTToken } from "./jwt-tokens.lib";

// TODO Переписать все
export const getUserIdByAccessTokenFromRequest = async (
  request: NextRequest
): Promise<number> => {
  try {
    const token =
      request.headers.get("authorization")?.split(" ")[1] ??
      request.cookies.get("yourMom")?.value;

    if (!token) throw new Error("Token не найден");
    const parsedToken = await verifyJWTToken(token);

    // TODO: Установить, чтобы было понятно что я возвращаю
    if (!parsedToken.userId) throw new Error("id не найден");
    return Number(parsedToken.userId);
  } catch {
    throw new Error("UserId не найден через cookie");
  }
};

export const getCookieValue = (cookiesArray: string[], cookieName: string) => {
  for (const cookie of cookiesArray) {
    const [nameValue] = cookie.split(";"); // Берем только часть до первого ';'
    const [name, value] = nameValue.split("=");
    if (name.trim() === cookieName) {
      return decodeURIComponent(value); // Возвращаем значение куки
    }
  }

  // Если куки с таким именем не найдено, возвращаем null
  return null;
};
