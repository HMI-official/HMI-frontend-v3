import { toast } from "react-toastify";

export const toastNotify = (msg: string) =>
  toast(msg, { position: "top-left" });
export const errorNotify = (msg: string) => toast.error(msg);
