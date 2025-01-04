import { toast } from "sonner";
import { callApi } from "./base.service";
import { SingIn_I, SingUp_I } from "@/types/auth.types";

export const signInService = async (signInDTO: SingIn_I) => {
  try {
    const result = await callApi("POST", "auth/sign-in", signInDTO);
    toast.success("Успешный вход", {
      description: "Ожидайте перехода на главный экран",
    });
    return result;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\

    toast.error("Ошибка входа");
    return null;
  }
};

export const signUpService = async (signUpDTO: SingUp_I) => {
  try {
    const result = await callApi("POST", "auth/sign-up", signUpDTO);
    toast.success("Успешная регистрация", {
      description: "Ожидайте перехода на главный экран",
    });
    return result;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\

    toast.error("Ошибка регистрации");
    return null;
  }
};

export const signOutService = async () => {
  try {
    const result = await callApi("DELETE", "auth/sign-out");
    toast("Пока", {
      description: "Будем ждать тебя снова",
    });
    return result;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось выйти");
    return null;
  }
};
