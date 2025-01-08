"use client";

import LabelBlock from "@/components/blocks/label.block";
import { Input } from "@/components/ui/input";
import { ru } from "date-fns/locale";
// import { updateUserByPath } from "@/services/user.service";
import { useUserStore } from "@/stores/user.store";

import { UserMinDTO_I } from "@/types/user.types";
import { formatDistance } from "date-fns";
import { useEffect } from "react";

interface SettingsClientProps {
  initialUser: UserMinDTO_I;
}

const SettingsClient: React.FC<SettingsClientProps> = ({ initialUser }) => {
  const { user, setUser } = useUserStore();

  useEffect(() => setUser(initialUser), [initialUser, setUser]);

  const verifyMailContent = () => {
    return user.isVerifyMail ? (
      <div className="text-xs">Аккаунт верифицирован</div>
    ) : (
      <div className="text-xs">Требуется подтверждение почты</div>
    );
  };

  // let userDataForUpdate: Partial<UserMinDTO_I> = {};

  // const updateUser = () => {
  //   console.log("update");
  // };

  // useDebounce(() => updateUser(), 3000, [Object.values(userDataForUpdate)]);

  return (
    <div className="flex flex-col gap-4">
      <LabelBlock value="Логин">
        <Input
          value={user.login ?? ""}
          onChange={(event) => setUser({ ...user, login: event.target.value })}
          readOnly
        />
      </LabelBlock>
      <LabelBlock value="Имя">
        <Input
          value={user.fullName ?? ""}
          onChange={(event) =>
            setUser({ ...user, fullName: event.target.value })
          }
          readOnly
        />
      </LabelBlock>
      <LabelBlock value="Пароль">
        <Input value="Не покажу" readOnly />
      </LabelBlock>
      <div>
        <LabelBlock value="Почта">
          <Input value={user.mail ?? ""} readOnly />
        </LabelBlock>
        {verifyMailContent()}
      </div>
      {user.createdAt && (
        <p className="inline-flex gap-2">
          Аккаунт создан:
          <span>
            {formatDistance(new Date(user.createdAt), new Date(), {
              addSuffix: true,
              locale: ru,
            })}
          </span>
        </p>
      )}

      {/* <li> Поменять язык</li> */}
      {/* <li>Привязать соц сети(Пока что телеграмм для оповещений)</li> */}
      {/*  Закинуть мне денег.{" "} */}
      {/* Поменять пароль */}
      {/* ПОдтвердить почту */}
    </div>
  );
};

export default SettingsClient;
