import axios from "axios";
// import { api } from ".";

interface FetchWalletProps {
  account: string;
  signature: string;
  message: string;
  token?: string;
}

export const fetchWallet = async (props: FetchWalletProps) => {
  const { account, signature, message, token } = props;
  // accessToken
  // tokenType
  if (!token) return console.log("No access token");
  //   const token = `${tokenType} ${accessToken}`;
  //   const url = `http://localhost:5000/verify/api/v1`;
  const data = { account, signature, message };
  const headers = { headers: { Authorization: token } };
  const response = await axios.post("/api/v1/verify", data, headers);
  return response.data;
};
