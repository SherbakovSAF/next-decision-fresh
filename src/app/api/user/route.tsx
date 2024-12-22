import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma.client";

export const GET = async () => {
  try {
    // console.log(data);
    const users = await prisma.user.findMany();

    return NextResponse.json(users);

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
