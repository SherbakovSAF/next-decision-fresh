import { getCurrentUserService } from "@/services/user.service";
import { UserMinDTO_I } from "@/types/user.types";
import SettingsClient from "./(settings-content-client)/settings-client";

const SettingsPage = async () => {
  let user: UserMinDTO_I | null = null;

  try {
    user = await getCurrentUserService();
    return <SettingsClient initialUser={user} />;
  } catch {
    return <div>Ошибка. Next калл</div>;
  }
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
