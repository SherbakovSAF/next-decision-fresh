import { calculateAverageReactions } from "@/hooks/calculateAverageReactions.hook";
import { Doubt_I } from "@/types/doubt.type";
import { getUserIdByAccessTokenFromRequest } from "@/lib/cookies-handler.lib";
import prisma from "../../../../prisma/prisma.client";
import { Doubt_M } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { handleError } from "@/lib/handlerError.lib";

const getOneDoubt = async (id: number, request: NextRequest) => {
  try {
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
    return NextResponse.json(...handleError("BAD_REQUEST", error));
  }
};

const getAllDoubt = async (request: NextRequest) => {
  try {
    const data = await prisma.doubt_M.findMany({
      where: {
        dateFinish: { gt: new Date() },
        userId: await getUserIdByAccessTokenFromRequest(request),
      },
      include: { doubtReactions: true },
    });

    return NextResponse.json(
      data.map((doubt): Doubt_I => {
        const reactions = doubt.doubtReactions.map((reaction) => reaction.type);
        return {
          ...doubt,
          averageReaction: calculateAverageReactions(reactions),
        };
      })
    );
  } catch (error) {
    // console.log("server", error);
    return NextResponse.json(...handleError("BAD_REQUEST", error));
  }
};

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (id) {
    return getOneDoubt(Number(id), request);
  } else {
    return getAllDoubt(request);
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: Doubt_M = await request.json();
    // console.log(getUserIdByAccessTokenFromRequest(request));
    const newData = await prisma.doubt_M.create({
      data: {
        title: data.title,
        dateFinish: data.dateFinish,
        userId: await getUserIdByAccessTokenFromRequest(request),
      },
    });

    return NextResponse.json(newData);
  } catch (error) {
    return NextResponse.json(handleError("BAD_REQUEST", error));
  }
}

export async function PUT(request: NextRequest) {
  // Добавить проверку на userid
  try {
    const { id, title, dateFinish, userId }: Doubt_M = await request.json();
    if (userId !== (await getUserIdByAccessTokenFromRequest(request)))
      throw new Error("Вы пытаес");
    const updatedDoubt = await prisma.doubt_M.update({
      where: { id },
      data: { id, title, dateFinish, userId },
    });
    return NextResponse.json(updatedDoubt);
  } catch (error) {
    return NextResponse.json(...handleError("BAD_REQUEST", error));
  }
}
