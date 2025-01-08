import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";
import { getCookieValue } from "./lib/cookies-handler.lib";
import { getPayloadJWTToken } from "./lib/jwt-tokens.lib";
import { callApiFetch } from "./services/base.service";
import { CookiesName } from "./types/cookies-name.type";
import { RoutePath_E } from "./types/route-path.type";

export const middleware = async (request: NextRequest) => {
  // Получаем access токен
  const accessToken = request.cookies.get(CookiesName.AccessToken)?.value;
  const token = await getPayloadJWTToken(accessToken ?? "");

  if (token && request.nextUrl.pathname.startsWith(RoutePath_E.AUTH))
    return NextResponse.rewrite(new URL(RoutePath_E.NOT_FOUND, request.url));
  console.log("Прошли проверку токена и начала");
  // Доп проверка, чтобы избежать множества переадресаций
  if (request.nextUrl.pathname.startsWith(RoutePath_E.AUTH))
    return NextResponse.next();

  // Если просто есть токен и идёт на не Auth, то добро пожаловать
  if (token) return NextResponse.next();

  // Если же токена нет, то смотрим, есть ли refresh
  const refreshToken = request.cookies.get(CookiesName.RefreshToken)?.value;
  // Refresh нет - будь добр авторизуйся

  if (!refreshToken)
    return NextResponse.redirect(new URL(RoutePath_E.AUTH, request.url));

  // Если Refresh есть, то делаем самое сложное - запрос
  const responseFetch = await callApiFetch("GET", "/auth/refresh");

  // Parse запроса на получение из Headers accessToken
  const accessTokenFromServer = getCookieValue(
    responseFetch.headers.getSetCookie(),
    CookiesName.AccessToken
  );

  // Если не пришёл access, что вряд ли, то авторизация
  if (!accessTokenFromServer)
    return NextResponse.redirect(new URL(RoutePath_E.AUTH, request.url));

  // Т.к middleware  выполняется на сервере, то нам надо перекинуть полученные set-cookie клиенту
  const response = NextResponse.next();
  response.cookies.set(CookiesName.AccessToken, accessTokenFromServer);
  return response;
};

export const config: MiddlewareConfig = {
  matcher: ["/", "/auth", "/settings"],
};
