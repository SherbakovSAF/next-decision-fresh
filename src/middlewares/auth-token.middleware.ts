import { getCookieValue } from "@/lib/cookies-handler.lib";
import { isValidToken } from "@/lib/jwt-tokens.lib";

import { NextRequest, NextResponse } from "next/server";

export const AuthTokenMiddleware = async (
  request: NextRequest
): Promise<NextResponse | undefined> => {
  const response = NextResponse.next();

  try {
    const accessToken = request.cookies.get("yourMom")?.value;
    console.log(await isValidToken(accessToken ?? ""));
    if (await isValidToken(accessToken ?? "")) return response;
  } catch {
    const refreshToken = request.cookies.get("yourDad")?.value;
    if (!refreshToken)
      return NextResponse.redirect(new URL("/auth", request.url));

    // TODO: Добавить в пути
    // Делаем запрос на сервер, чтобы он обновил auth в cookies

    const responseFetch = await fetch(
      new URL(`${process.env.NEXT_PUBLIC_URL_PATH}/api/refresh`, request.url),
      {
        method: "GET", // Метод запроса
        headers: {
          "Content-Type": "application/json", // Тип контента
          Cookie: request.cookies.toString() || "", // Передача куков
        },
        credentials: "same-origin", // Передача куков на клиент-сервер
      }
    );

    console.log("fetch", responseFetch.headers);

    const accessTokenFromServer = getCookieValue(
      responseFetch.headers.getSetCookie(),
      "yourMom"
    );

    if (!accessTokenFromServer)
      throw new Error("Bad Request, но на самом деле нет токена");
    response.cookies.set("yourMom", accessTokenFromServer);

    console.log("fetch res", response);
    return response;
  }
};
