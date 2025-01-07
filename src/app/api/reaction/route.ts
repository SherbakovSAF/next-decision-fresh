import { getUserIdFromRequest } from "@/lib/cookies-handler.lib";
import prisma from "../../../../prisma/prisma.client";
import { DoubtReaction_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { HandleError } from "@/lib/handlerError.lib";
import { calculateAverageReactions } from "@/hooks/calculateAverageReactions.hook";
import { ReactionCreateDTO } from "@/types/reaction.types";

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
        userId: await getUserIdFromRequest(request),
      },
    });

    return NextResponse.json<DoubtReaction_M[]>(data);
  } catch (error) {
    return NextResponse.json(HandleError.nextResponse("BAD_REQUEST", error));
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: DoubtReaction_M = await request.json();
    const newReaction = await prisma.doubtReaction_M.create({
      data: {
        emotionText: data.emotionText,
        type: data.type,
        userId: await getUserIdFromRequest(request),
        doubtId: data.doubtId,
      },
    });

    const allReaction = await prisma.doubt_M.findFirstOrThrow({
      where: { id: newReaction.doubtId },
      select: { doubtReactions: { select: { type: true } } },
    });

    const updatedDoubt: ReactionCreateDTO["updatedDoubt"] = {
      id: newReaction.doubtId,
      averageReaction: calculateAverageReactions(
        allReaction.doubtReactions.map((reaction) => reaction.type)
      ),
    };

    return NextResponse.json<ReactionCreateDTO>({ newReaction, updatedDoubt });
  } catch (error) {
    return NextResponse.json(HandleError.nextResponse("BAD_REQUEST", error));
  }
}
