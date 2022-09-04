export const mintCommonConfigInit = {
  totalPrice: "0.012",
  _mintAmount: 1,
  receiver: "0x1",
  _merkleProof: [],
};

export interface IMintComponentConfig {
  totalPrice: string;
  _mintAmount: number;
  receiver: string | undefined;
  _merkleProof?: string[];
}
