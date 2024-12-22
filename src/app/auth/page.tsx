"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AuthPage: React.FC = () => {
  const [login, setLogin] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    try {
      // console.log(data);
      const finedUser = await fetch(
        `${process.env.NEXT_PUBLIC_URL_PATH}/api/login`,
        {
          method: "POST",
          body: JSON.stringify({ login }),
        }
      );

      if (finedUser) router.push("/");

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
      alert("Неудача");
      // return NextResponse.json({ error: error }, { status: 500 });
    }
  };
  const handleRegister = async () => {
    try {
      // console.log(data);

      const newUser = await fetch(
        `${process.env.NEXT_PUBLIC_URL_PATH}/api/auth`,
        {
          method: "POST",
          body: JSON.stringify({ login }),
        }
      );

      if (newUser) router.push("/");

      // TODO: Вынести создание токена отдельно

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
      alert("Неудача");
      // return NextResponse.json({ error: error }, { status: 500 });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="mail"
        value={login}
        onChange={(event) => setLogin(event.target.value)}
      />
      {/* <input type="text" placeholder="pass" /> */}
      <button onClick={() => handleRegister()}>Создать</button>
      <button onClick={() => handleLogin()}>Войти</button>
    </div>
  );
};

export default AuthPage;
