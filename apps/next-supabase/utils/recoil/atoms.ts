import { atom } from "recoil";

export const searchState = atom({
  key: "searchState",
  default: "",
})

export const selectedUserIdState = atom<string | null>({
  key: "selectedUserIdState",
  default: null,
})