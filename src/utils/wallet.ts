import { web3 } from "./interact";

export const cutAccount = (wallet: string) =>
  wallet.slice(0, 8) + "..." + wallet.slice(-4);

export const signAccount = async (account: string) => {
  const message = `sign to verify your wallet ${account}`;
  // const decodedWallet = await web3.eth.accounts.recover(message, signiture);

  const signature = await web3.eth.personal.sign(message, account, "password");
  return { signature, message };
};

// export const getAccount = async () => {
//   if (!window.ethereum) return console.log("No web3 detected");

//   await window.ethereum.send("eth_requestAccounts");
//   // window.web3 = new Web3(window.ethereum);

//   const accounts = await web3.eth.getAccounts();
//   const account = accounts[0];
//   return account;
// };
