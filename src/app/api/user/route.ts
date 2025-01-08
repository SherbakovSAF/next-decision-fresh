import { getUserIdFromRequest } from "@/lib/cookies-handler.lib";
import { HandleError } from "@/lib/handlerError.lib";
import { UserMinDTO_I } from "@/types/user.types";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma.client";

export async function GET(request: NextRequest) {
  try {
    const data = await prisma.user_M.findFirstOrThrow({
      where: {
        id: await getUserIdFromRequest(request),
      },
      select: {
        createdAt: true,
        fullName: true,
        login: true,
        mail: true,
        isVerifyMail: true,
      },
    });

    return NextResponse.json<UserMinDTO_I>(data);
  } catch (error) {
    return NextResponse.json(HandleError.nextResponse("NOT_FOUND", error));
  }
}

// export async function PATH(request: NextRequest) {
//   try {
//     const data: UserMinDTO_I = await request.json();
//     console.log(data);
//     //  request.nextUrl.searchParams.forEach((value, key) => {
//     //     if (key in ({} as UserMinDTO_I)) {
//     //      console.log(key, value);
//     //    }
//     //   })
//     // const updatedUser = await prisma.user_M.update({
//     //   where: {
//     //     id: await getUserIdFromRequest(request),
//     //   },
//     //   data: {

//     //  }
//     // });

//     return NextResponse.json<UserMinDTO_I>(data);
//   } catch (error) {
//     return NextResponse.json(HandleError.nextResponse("NOT_FOUND", error));
//   }
// }

// export async function PUT(request: NextRequest) {
//   try {
//     const data = await prisma.user_M.findFirstOrThrow({
//       where: {
//         id: await getUserIdFromRequest(request),
//       },
//       select: {
//         createdAt: true,
//         fullName: true,
//         login: true,
//         mail: true,
//         isVerifyMail: true,
//       },
//     });

//     return NextResponse.json<UserMinDTO_I>(data);
//   } catch (error) {
//     return NextResponse.json(HandleError.nextResponse("NOT_FOUND", error));
//   }
// }
