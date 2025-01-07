import { CookiesName } from "@/types/cookies-name.type";
import prisma from "../../../../../prisma/prisma.client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getUserIdFromRequest } from "@/lib/cookies-handler.lib";
import { HandleError } from "@/lib/handlerError.lib";

export async function DELETE(request: NextRequest) {
  try {
    const cookiesStore = await cookies();

    const userIdByAccessToken = await getUserIdFromRequest(request);

    if (!userIdByAccessToken)
      return NextResponse.json(HandleError.const("NOT_FOUND"));

    await prisma.user_M.update({
      where: { id: userIdByAccessToken },
      data: { refreshToken: null },
    });

    cookiesStore.delete(CookiesName.AccessToken);
    cookiesStore.delete(CookiesName.RefreshToken);

    return NextResponse.json(HandleError.const("OK"));
  } catch (error) {
    return NextResponse.json(HandleError.nextResponse("BAD_REQUEST", error));
  }
}
