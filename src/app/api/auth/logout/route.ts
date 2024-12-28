import { CookiesName } from "@/types/cookies-name.type";
import prisma from "../../../../../prisma/prisma.client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdByAccessTokenFromRequest } from "@/lib/cookies-handler.lib";
import { handleError } from "@/lib/handlerError.lib";

export async function DELETE(request: NextRequest) {
  try {
    const cookiesStore = await cookies();

    const userIdByAccessToken = await getUserIdByAccessTokenFromRequest(
      request
    );

    if (!userIdByAccessToken)
      return NextResponse.json({ success: true }, { status: 500 });
    await prisma.user_M.update({
      where: { id: userIdByAccessToken },
      data: { refreshToken: null },
    });
    cookiesStore.delete(CookiesName.AccessToken);
    cookiesStore.delete(CookiesName.RefreshToken);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(handleError("BAD_REQUEST", error));
  }
}
