import { getCurrentUserService } from "@/services/user.service";
import { UserMinDTO_I } from "@/types/user.types";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import SettingsClient from "./(settings-content-client)/settings-client";

const SettingsPage = async () => {
  let user: UserMinDTO_I | null = null;

  try {
    user = await getCurrentUserService();
  } catch {
    redirect("/");
  }

  return (
    <Suspense fallback={<div>Грузим твои данные</div>}>
      <SettingsClient initialUser={user} />
    </Suspense>
  );
};

export default SettingsPage;
{
  /* <li> Поменять язык</li> */
}
{
  /* <li>Привязать соц сети(Пока что телеграмм для оповещений)</li> */
}
{
  /*  Закинуть мне денег.{" "} */
}
{
  /* Поменять пароль */
}
{
  /* ПОдтвердить почту */
}
