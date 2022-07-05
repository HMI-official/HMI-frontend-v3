export const cutAccount = (wallet: string) =>
  wallet.slice(0, 8) + "..." + wallet.slice(-4);
