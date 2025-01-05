import { createJWTToken } from "@/lib/jwt-tokens.lib";
import prisma from "../../../../../prisma/prisma.client";
import { CookiesName } from "@/types/cookies-name.type";
import { User_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/handlerError.lib";
import { genPass } from "@/lib/hash-password.lib";

export async function POST(request: NextRequest) {
  try {
    const data: User_M = await request.json();

    const newUser = await prisma.user_M.create({
      data: {
        login: data.login,
        password: await genPass(data.password),
        mail: data.mail ?? "",
      },
    });

    const response = NextResponse.json({ success: true }, { status: 200 });
    // TODO: Вынести создание куки отдельно
    // TODO: Переписать функцию создания куки и т.д
    const newAccessToken = await createJWTToken({ userId: newUser.id }, "1hr");
    const newRefreshToken = await createJWTToken(
      { message: "YourMom is so a big pig" },
      "7day"
    );
    response.cookies.set(CookiesName.AccessToken, newAccessToken);

    response.cookies.set(CookiesName.RefreshToken, newRefreshToken);
    await prisma.user_M.update({
      where: { id: newUser.id },
      data: { refreshToken: newRefreshToken },
    });

    return response;
  } catch (error) {
    return NextResponse.json(...handleError("BAD_REQUEST", error));
  }
}
