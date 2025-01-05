// import { setTokens } from "@/lib/jwtTokens";
import { CookiesName } from "@/types/cookies-name.type";
import { createJWTToken } from "@/lib/jwt-tokens.lib";
import prisma from "../../../../../prisma/prisma.client";
import { User_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/handlerError.lib";
import { verifyPass } from "@/lib/hash-password.lib";

export async function POST(request: NextRequest) {
  try {
    const data: User_M = await request.json();

    const finedUser = await prisma.user_M.findFirstOrThrow({
      where: {
        OR: [{ login: data.login }, { mail: data.login }],
      },
    });

    if (!(await verifyPass(data.password, finedUser.password)))
      return NextResponse.json(...handleError("NOT_FOUND"));
    // TODO: Вынести создание токена отдельно
    // TODO: Вынести создание куки отдельно
    // TODO: Переписать функцию создания куки и т.д
    const response = NextResponse.json({ success: true }, { status: 200 });

    const newAccessToken = await createJWTToken(
      { userId: finedUser.id },
      "1hr"
    );

    const newRefreshToken = await createJWTToken(
      { message: "YourMom is so a big pig" },
      "7day"
    );

    response.cookies.set(CookiesName.AccessToken, newAccessToken);

    response.cookies.set(CookiesName.RefreshToken, newRefreshToken);
    await prisma.user_M.update({
      where: { id: finedUser.id },
      data: { refreshToken: newRefreshToken },
    });

    return response;
  } catch (error) {
    return NextResponse.json(...handleError("BAD_REQUEST", error));
  }
}
