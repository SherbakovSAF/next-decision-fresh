import { calculateAverageReactions } from "@/hooks/calculateAverageReactions.hook";
import { getUserIdByAccessTokenFromRequest } from "@/lib/cookies-handler.lib";
import prisma from "../../../../../prisma/prisma.client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/handlerError.lib";

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    console.log(request);
    if (!id) throw new Error("Нет ID");
    const data = await prisma.doubt_M.findFirstOrThrow({
      where: {
        id: Number(id),
        userId: await getUserIdByAccessTokenFromRequest(request),
      },
      include: {
        doubtReactions: true,
      },
    });

    const reactions = data.doubtReactions.map((reaction) => reaction.type);

    return NextResponse.json({
      ...data,
      averageReaction: calculateAverageReactions(reactions),
    });
  } catch (error) {
    return NextResponse.json(handleError("BAD_REQUEST", error));
  }
}
