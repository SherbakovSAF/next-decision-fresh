// import { Doubt_M, DoubtReaction_E, DoubtReaction_M } from "@prisma/client";

// export interface Doubt_I extends Doubt_M {
//   averageReaction: DoubtReaction_E;
//   doubtReactions?: DoubtReaction_M[];
// }
export interface Doubt_I {
  averageReaction: string;
}
