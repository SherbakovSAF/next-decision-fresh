import {
  createAccessTokenCookie,
  createRefreshTokenCookie,
} from "@/lib/cookies-handler.lib";
import { HandleError } from "@/lib/handlerError.lib";
import { genPass } from "@/lib/hash-password.lib";
import { User_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma.client";

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

    const response = NextResponse.json(HandleError.nextResponse("CREATED"));
    await createAccessTokenCookie(response, newUser.id);
    const newRefreshToken = await createRefreshTokenCookie(response);
    await prisma.user_M.update({
      where: { id: newUser.id },
      data: { refreshToken: newRefreshToken },
    });

    return response;
  } catch (error) {
    return NextResponse.json(HandleError.nextResponse("BAD_REQUEST", error));
  }
}
