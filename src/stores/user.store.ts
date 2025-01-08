import { UserMinDTO_I } from "@/types/user.types";
import { create } from "zustand";

interface UserStore_I {
  user: UserMinDTO_I;
  setUser: (user: UserMinDTO_I) => void;
}

export const useUserStore = create<UserStore_I>((set) => ({
  user: {} as UserMinDTO_I,
  setUser: (newUser: UserMinDTO_I) => set({ user: newUser }),
}));
