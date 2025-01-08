import { UserMinDTO_I } from "@/types/user.types";
import { toast } from "sonner";
import { callApi } from "./base.service";

export const getCurrentUserService = async (): Promise<UserMinDTO_I> => {
  try {
    return callApi<UserMinDTO_I>("GET", "user");
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось получить ваши данные");
    throw new Error();
  }
};

export const updateUserByPath = async (
  data: Partial<UserMinDTO_I>
): Promise<UserMinDTO_I> => {
  try {
    const updatedUser = callApi<UserMinDTO_I>("PATCH", "user", data);
    toast.error("Данные успешно обновлены");
    return updatedUser;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось обновить ваши данные");
    throw new Error();
  }
};
