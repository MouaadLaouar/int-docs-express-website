import { atom } from "jotai";

export const UserID = atom(null);
export const openModel = atom(false);
export const OrgEdit = atom({
  id: null,
  Name: null,
});

export const DocEdit = atom({
  code: "",
  name: "",
  url: "",
  id: ""
});
