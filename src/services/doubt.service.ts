import { toast } from "sonner";
import { callApi } from "./base.service";
import { Doubt_I } from "@/types/doubt.type";
import { Doubt_M } from "@prisma/client";

export const createDoubtService = async (doubt: Doubt_M): Promise<Doubt_I> => {
  try {
    const createdDoubt = callApi<Doubt_I>("POST", "doubt", doubt);
    toast.success("Сомнение успешно создано");
    return createdDoubt;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось создать сомнение");
    throw new Error();
  }
};

export const getAllDoubtService = async (): Promise<Doubt_I[]> => {
  try {
    return callApi<Doubt_I[]>("GET", "doubt");
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось получить твои сомнения");
    throw new Error();
  }
};

export const getOneDoubtService = async (id: number): Promise<Doubt_I> => {
  try {
    return callApi<Doubt_I>("GET", "doubt", null, { id });
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось данные на о сомнении");
    throw new Error();
  }
};

export const updateDoubtService = async (doubt: Doubt_M): Promise<Doubt_I> => {
  try {
    const updatedDoubt = callApi<Doubt_I>("PUT", "doubt", doubt);
    toast.success("Сомнение успешно обновлено");
    return updatedDoubt;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось обновить сомнение");
    throw new Error();
  }
};
