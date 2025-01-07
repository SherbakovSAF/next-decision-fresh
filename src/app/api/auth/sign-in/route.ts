import { HandleError } from "@/lib/handlerError.lib";
import { verifyPass } from "@/lib/hash-password.lib";
import { User_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../prisma/prisma.client";
import {
  createAccessTokenCookie,
  createRefreshTokenCookie,
} from "@/lib/cookies-handler.lib";

export async function POST(request: NextRequest) {
  try {
    const data: User_M = await request.json();

    const finedUser = await prisma.user_M.findFirstOrThrow({
      where: {
        OR: [{ login: data.login }, { mail: data.login }],
      },
    });

    if (!(await verifyPass(data.password, finedUser.password)))
      return NextResponse.json(HandleError.nextResponse("NOT_FOUND"));

    const response = NextResponse.json(HandleError.nextResponse("CREATED"));

    await createAccessTokenCookie(response, finedUser.id);
    const newRefreshToken = await createRefreshTokenCookie(response);

    await prisma.user_M.update({
      where: { id: finedUser.id },
      data: { refreshToken: newRefreshToken },
    });

    return response;
  } catch (error) {
    return NextResponse.json(HandleError.nextResponse("BAD_REQUEST", error));
  }
}
