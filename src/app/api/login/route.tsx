import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma.client";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    // console.log(data);
    const finedUser = await prisma.user.findFirstOrThrow({
      where: {
        name: data.login,
      },
    });

    return NextResponse.json({ message: finedUser, status: 200 });

    // TODO: Вынести создание токена отдельно

    // const newAccessToken = await createJWTToken(
    //   { userId: finedUser.id },
    //   "1hr"
    // );
    // console.log("newAccessToken", newAccessToken);
    // const newRefreshToken = await createJWTToken(
    //   { message: "YourMom is so a big pig" },
    //   "7day"
    // );
    // console.log("newRefreshToken", newRefreshToken);
    // response.cookies.set(CookiesName.AccessToken, newAccessToken);

    // response.cookies.set(CookiesName.RefreshToken, newRefreshToken);
    // await prisma.user_M.update({
    //   where: { id: finedUser.id },
    //   data: { refreshToken: newRefreshToken },
    // });
    // console.log("Прошли обновление");

    // return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "f", status: 500 });
  }
};
