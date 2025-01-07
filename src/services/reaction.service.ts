import { toast } from "sonner";
import { callApi } from "./base.service";
import { DoubtReaction_M } from "@prisma/client";
import { ReactionCreateDTO } from "@/types/reaction.types";

export const createReactionService = async (
  reaction: DoubtReaction_M
): Promise<ReactionCreateDTO> => {
  try {
    const createReaction = callApi<ReactionCreateDTO>(
      "POST",
      "reaction",
      reaction
    );
    toast.success("Реакция успешно создана");
    return createReaction;
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось создать реакцию");
    throw new Error();
  }
};

export const getReactionsByDoubtIdAndDateService = async (
  doubtId: number,
  time: number
): Promise<DoubtReaction_M[]> => {
  try {
    return callApi<DoubtReaction_M[]>("GET", "reaction", null, {
      doubtId,
      time,
    });
  } catch {
    // TODO: Позже можем достать из константы ответ и записать в descriptin\
    toast.error("Не удалось реакции на день");
    throw new Error();
  }
};
