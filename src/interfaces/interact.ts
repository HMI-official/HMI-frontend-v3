export interface IMintPolicy {
  price: string;
  startTime: number;
  endTime: number;
  name: string;
  index: number;
  paused: boolean;
  merkleRoot: string;
  maxMintAmountLimit: string;
}

export const MintPolicyInit: IMintPolicy = {
  price: "0",
  startTime: 0,
  endTime: 0,
  name: "",
  index: 0,
  paused: false,
  merkleRoot: "",
  maxMintAmountLimit: "0",
};
