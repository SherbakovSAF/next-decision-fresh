import { getUserIdByAccessTokenFromRequest } from "@/lib/cookies-handler.lib";
import prisma from "../../../../prisma/prisma.client";
import { DoubtReaction_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/handlerError.lib";

export async function GET(request: NextRequest) {
  try {
    const doubtId = request.nextUrl.searchParams.get("doubtId");
    const time = request.nextUrl.searchParams.get("time");

    if (!doubtId || !time) throw new Error();
    const startOfDay = new Date(new Date(Number(time)).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(Number(time)).setHours(23, 59, 59, 999));

    const data = await prisma.doubtReaction_M.findMany({
      where: {
        doubtId: Number(doubtId),
        createdAt: { gte: startOfDay, lte: endOfDay },
        userId: await getUserIdByAccessTokenFromRequest(request),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(handleError("BAD_REQUEST", error));
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: DoubtReaction_M = await request.json();
    const newReaction = await prisma.doubtReaction_M.create({
      data: {
        emotionText: data.emotionText,
        type: data.type,
        userId: await getUserIdByAccessTokenFromRequest(request),
        doubtId: data.doubtId,
      },
    });

    return NextResponse.json(newReaction);
  } catch (error) {
    return NextResponse.json(handleError("BAD_REQUEST", error));
  }
}
