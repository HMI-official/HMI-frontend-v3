import { ReactNode } from "react";

export interface IModalMemberInfo {
  name: string;
  desc: ReactNode;
  linkedin: string;
}

export const modalMemberInfoInit: IModalMemberInfo = {
  name: "",
  desc: "",
  linkedin: "",
};
