"use client";

import LabelBlock from "@/components/blocks/label.block";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { LoginSchema, PasswordSchema } from "@/lib/yup-schemas.lib";
import { signInService, signUpService } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormData = yup.InferType<typeof schema>;
const schema = yup.object({
  login: LoginSchema,
  password: PasswordSchema,
});

const AuthPage: React.FC = () => {
  const router = useRouter();

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

  const handleSignIn = async (event: FormData) => {
    try {
      setLoadingRequest(true);

      const finedUser = await signInService({
        login: event.login,
        password: event.password,
      });

      if (finedUser) router.push("/");
    } finally {
      setLoadingRequest(false);
    }
  };
  const handleSignUp = async (event: FormData) => {
    try {
      setLoadingRequest(true);
      const finedUser = await signUpService({
        login: event.login,
        password: event.password,
        mail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.login ?? "")
          ? event.login
          : "",
      });

      if (finedUser) router.push("/");
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
            <Button onClick={handleSubmit(handleSignUp)}>Создать</Button>
            <Button onClick={handleSubmit(handleSignIn)}>Войти</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
