import { OnboardAPI } from "@web3-onboard/core";
import { ReactElement, ReactNode } from "react";

export interface IIcon {
  w: number;
  h: number;
  props: React.ReactNode;
}

export interface IWeb3Onboard {
  initOnboard: OnboardAPI;
}

export interface IMintStatus {
  success: any;
  message: any;
}
