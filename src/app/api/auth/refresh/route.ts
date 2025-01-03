import { CookiesName } from "@/types/cookies-name.type";
import { createJWTToken, isValidToken } from "@/lib/jwt-tokens.lib";
import prisma from "../../../../../prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/handlerError.lib";

export async function GET(request: NextRequest) {
  try {
    // Получаем refreshToken из куки запроса
    const refreshToken = request.cookies.get(CookiesName.RefreshToken)?.value;

    if (!refreshToken) throw new Error("Cookie не найдены");
    if (!isValidToken(refreshToken)) throw new Error("Токен устарел");
    // Проверяем наличие пользователя с этим refreshToken в базе данных
    const user = await prisma.user_M.findFirstOrThrow({
      where: { refreshToken },
    });

    // Создаем новый accessToken
    const newAccessToken = await createJWTToken({ userId: user.id }, "1hr");

    // Создаем ответ
    const response = NextResponse.json({ success: true }, { status: 200 });

    // Устанавливаем cookie с accessToken
    response.cookies.set(CookiesName.AccessToken, newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Включить только для HTTPS в продакшене
      sameSite: "none", // Или "none" для кросс-доменных запросов
      path: "/", // Делает cookie доступными на всем сайте
      maxAge: 3600, // Время жизни cookie (1 час)
    });

    // response.cookies.set(CookiesName.AccessToken, newAccessToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production", // Включать только для HTTPS в продакшн-режиме
    //   sameSite: "None", // Для кросс-доменных запросов
    //   path: "/",
    //   maxAge: 3600, // 1 час
    // });

    return response;
  } catch (error) {
    return NextResponse.json(handleError("BAD_REQUEST", error));
  }
}
