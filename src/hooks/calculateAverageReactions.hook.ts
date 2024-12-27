import { DoubtReaction_E } from "@prisma/client";

export const calculateAverageReactions = (
  reactions: DoubtReaction_E[]
): DoubtReaction_E => {
  const goodCount = reactions.filter(
    (reaction) => reaction === DoubtReaction_E.GOOD
  ).length;
  const badCount = reactions.filter(
    (reaction) => reaction === DoubtReaction_E.BAD
  ).length;

  if (goodCount > badCount) {
    return DoubtReaction_E.GOOD;
  } else if (badCount > goodCount) {
    return DoubtReaction_E.BAD;
  } else {
    return DoubtReaction_E.NORMAL;
  }
};
