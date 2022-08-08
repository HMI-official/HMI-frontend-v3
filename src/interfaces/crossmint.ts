export const mintCommonConfigInit = {
  totalPrice: "0.001",
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
