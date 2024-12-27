import { DoubtReaction_E } from "@prisma/client";

export const getDoubtBgColor = (type: DoubtReaction_E) => {
  return {
    [DoubtReaction_E.BAD]: {
      primary: "bg-doubt-BAD",
      secondary: "bg-doubt-BAD-secondary",
    },
    [DoubtReaction_E.GOOD]: {
      primary: "bg-doubt-GOOD",
      secondary: "bg-doubt-GOOD-secondary",
    },
    [DoubtReaction_E.NORMAL]: {
      primary: "bg-doubt-NORMAL",
      secondary: "bg-doubt-NORMAL-secondary",
    },
  }[type];
};

export const getDoubtTextColor = (type: DoubtReaction_E) => {
  return {
    [DoubtReaction_E.BAD]: {
      primary: "text-doubt-BAD",
      secondary: "text-doubt-BAD-secondary",
    },
    [DoubtReaction_E.GOOD]: {
      primary: "text-doubt-GOOD",
      secondary: "text-doubt-GOOD-secondary",
    },
    [DoubtReaction_E.NORMAL]: {
      primary: "text-doubt-NORMAL",
      secondary: "text-doubt-NORMAL-secondary",
    },
  }[type];
};
