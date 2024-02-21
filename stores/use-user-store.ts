import { Conversation } from "@prisma/client";
import { create } from "zustand";

interface IUseUserStore {
  name: string;
  setName: (value: string) => void;
  nickname: string;
  setNickname: (value: string) => void;
  image?: string;
  setImage: (value: string) => void;
}

const useUserStore = create<IUseUserStore>((set) => ({
  name: "",
  setName: (value) => set({ name: value }),
  nickname: "",
  setNickname: (value) => set({ nickname: value }),
  image: "",
  setImage: (value) => set({ image: value }),
}));

export default useUserStore;
