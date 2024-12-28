// import { setTokens } from "@/lib/jwtTokens";
import { CookiesName } from "@/types/cookies-name.type";
import { createJWTToken } from "@/lib/jwt-tokens.lib";
import prisma from "../../../../../prisma/prisma.client";
import { User_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data: User_M = await request.json();

    const finedUser = await prisma.user_M.findFirstOrThrow({
      where: {
        OR: [{ login: data.login }, { mail: data.login }],
        password: data.password,
      },
    });

    // TODO: Вынести создание токена отдельно

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
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
