import { HandleError } from "@/lib/handlerError.lib";
import { createJWTToken, getPayloadJWTToken } from "@/lib/jwt-tokens.lib";
import { CookiesName } from "@/types/cookies-name.type";
import { User_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface AccessTokenPayloadJWT {
  userId: User_M["id"];
}

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "strict" as const,
  path: "/",
};

// TODO Переписать все
export const getUserIdFromRequest = async (request: NextRequest) => {
  try {
    const token = request.cookies.get(CookiesName.AccessToken)?.value;
    if (!token) throw new Error(HandleError.const("NOT_FOUND"));
    return await getUserIdFromAccessToken(token);
  } catch {
    throw new Error(HandleError.const("NOT_FOUND"));
  }
};

export const getCookieValue = (cookiesArray: string[], cookieName: string) => {
  for (const cookie of cookiesArray) {
    const [nameValue] = cookie.split(";");
    const [name, value] = nameValue.split("=");
    if (name.trim() === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const createAccessToken = async (userId: AccessTokenPayloadJWT["userId"]) => {
  return createJWTToken({ userId: userId }, "1h");
};

const getUserIdFromAccessToken = async (token: string) => {
  try {
    return Number((await getPayloadJWTToken(token))?.userId);
  } catch {
    throw new Error(HandleError.const("NOT_FOUND"));
  }
};

export const createAccessTokenCookie = async (
  response: NextResponse,
  userId: AccessTokenPayloadJWT["userId"]
): Promise<string> => {
  const token = await createAccessToken(userId);
  response.cookies.set(CookiesName.AccessToken, token, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60,
  });
  return token;
};

export const createRefreshTokenCookie = async (
  response: NextResponse
): Promise<string> => {
  const token = await createJWTToken({ message: "You stupid" }, "7d");
  response.cookies.set(CookiesName.RefreshToken, token, {
    ...COOKIE_OPTIONS,
    maxAge: 7 * 24 * 60 * 60,
  });
  return token;
};
