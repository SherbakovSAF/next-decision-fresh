import { CookiesName } from "@/types/cookies-name.type";
import { getPayloadJWTToken } from "@/lib/jwt-tokens.lib";
import prisma from "../../../../../prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";
import { HandleError } from "@/lib/handlerError.lib";
import { createAccessTokenCookie } from "@/lib/cookies-handler.lib";

export async function GET(request: NextRequest) {
  try {
    const refreshToken = request.cookies.get(CookiesName.RefreshToken)?.value;

    if (!refreshToken) throw new Error(HandleError.const("NOT_FOUND"));
    if (!getPayloadJWTToken(refreshToken))
      throw new Error(HandleError.const("UNAUTHORIZED"));

    const user = await prisma.user_M.findFirstOrThrow({
      where: { refreshToken },
    });

    const response = NextResponse.json(HandleError.nextResponse("CREATED"));
    await createAccessTokenCookie(response, user.id);

    return response;
  } catch (error) {
    return NextResponse.json(HandleError.nextResponse("BAD_REQUEST", error));
  }
}
