"use client";
import LabelBlock from "@/components/blocks/label.block";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { yupResolver } from "@hookform/resolvers/yup";
// import { User_M } from "@prisma/client";
// import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormData = yup.InferType<typeof schema>;
const schema = yup
  .object({
    login: yup
      .string()
      .required("Поле обязательное")
      .min(3, "Минимум 3 символа"),
    password: yup.string().required().min(6),
  })
  .required();

const AuthPage: React.FC = () => {
  // const [login, setLogin] = useState("");
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const [isLoadingRequest, setLoadingRequest] = useState<boolean>(false);

  const handleLogin = async (event: FormData) => {
    try {
      setLoadingRequest(true);
      // TODO: Перенести в service
      // TODO: ПЕреписать на singin sing out
      // TODO: ЛУчше сделать отдельное DTO для auth

      const finedUser = await fetch(
        `${process.env.NEXT_PUBLIC_URL_PATH}/api/auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            id: 0,
            login: event.login,
            password: event.password,
            createdAt: new Date(),
            updatedAt: new Date(),
            isVerifyMail: false,
            fullName: "",
            refreshToken: "",
            mail: event.login,
          }),
        }
      );

      console.log(finedUser);
    } finally {
      setLoadingRequest(false);
    }
  };
  const handleRegister = async (event: FormData) => {
    try {
      setLoadingRequest(true);
      const finedUser = await fetch(
        `${process.env.NEXT_PUBLIC_URL_PATH}/api/auth/register`,
        {
          method: "POST",
          body: JSON.stringify({
            id: 0,
            login: event.login,
            password: event.password,
            createdAt: new Date(),
            updatedAt: new Date(),
            isVerifyMail: false,
            fullName: "",
            refreshToken: "",
            mail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.login ?? "")
              ? event.login
              : "",
          }),
        }
      );
      console.log(finedUser);
      // TODO: Перенести в service
    } finally {
      setLoadingRequest(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <LabelBlock htmlFor="login" value="Логин/почта" error={errors.login}>
        <Input
          {...register("login")}
          className={errors.login && "border-2 border-error"}
          type="mail"
          id="login"
          placeholder="вашапочта@mail.ru"
          value={watch("login")}
        />
      </LabelBlock>
      <LabelBlock htmlFor="password" value="Пароль">
        <Input
          {...register("password")}
          className={errors.password && "border-2 border-error"}
          type="text"
          id="password"
          placeholder="qwe123"
          value={watch("password")}
        />
        {errors.password && (
          <small className="text-error">{errors.password.message}</small>
        )}
      </LabelBlock>
      <div className="flex items-center justify-center gap-4">
        {isLoadingRequest ? (
          <Icon name="Loader" className="animate-spin-slow w-5" />
        ) : (
          <>
            {" "}
            <Button onClick={handleSubmit(handleRegister)}>Создать</Button>
            <Button onClick={handleSubmit(handleLogin)}>Войти</Button>
          </>
        )}
      </div>
    </div>
    // <div className="flex flex-col gap-4">
    //   <input
    //     type="text"
    //     placeholder="mail"
    //     value={login}
    //     onChange={(event) => setLogin(event.target.value)}
    //   />
    //   {/* <input type="text" placeholder="pass" /> */}
    //   <button onClick={() => handleRegister()}>Создать</button>
    //   <button onClick={() => handleLogin()}>Войти</button>
    // </div>
  );
};

export default AuthPage;
