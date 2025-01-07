import { DoubtReaction_M } from "@prisma/client";
import { Doubt_I } from "./doubt.type";

export interface ReactionCreateDTO {
  newReaction: DoubtReaction_M;
  updatedDoubt: {
    id: Doubt_I["id"];
    averageReaction: Doubt_I["averageReaction"];
  };
}
