import Web3 from "web3";
import { Contract } from "web3-eth-contract";
import { useEffect, useState } from "react";
import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locale/en.json";
import {
  GET_NFT_ABI,
  GET_NFT_ADDRESS,
  MINT_NFT_ABI,
  MINT_NFT_ADDRESS,
  SALE_NFT_ABI,
  SALE_NFT_ADDRESS,
} from "../web3Config";

export const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | undefined>(undefined);

  const [mintNFTContract, setMintNFTContract] = useState<Contract | undefined>(
    undefined
  );
  const [saleNFTContract, setSaleNFTContract] = useState<Contract | undefined>(
    undefined
  );
  const [getNFTContract, setGetNFTContract] = useState<Contract | undefined>(
    undefined
  );

  useEffect(() => {
    if (!window.ethereum) return;
    setWeb3(new Web3(window.ethereum));
  }, []);

  useEffect(() => {
    if (!web3) return;
    setMintNFTContract(new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_ADDRESS));
    setSaleNFTContract(new web3.eth.Contract(SALE_NFT_ABI, SALE_NFT_ADDRESS));
    setGetNFTContract(new web3.eth.Contract(GET_NFT_ABI, GET_NFT_ADDRESS));
  }, [web3]);

  return { web3, mintNFTContract, saleNFTContract, getNFTContract };
};

export const cutAccount = (account: string | undefined) =>
  `${account?.substring(0, 4)}...${account?.substring(
    account?.length - 4,
    account?.length
  )}`;

// TimeAgo.addDefaultLocale(en);
export const getTransactionDate = (date: string, timeAgo: TimeAgo) => {
  // Create formatter (English).
  // const timeAgo = new TimeAgo("en-US");
  const timestamp = Number(date) * 1000;
  const longDate = new Date(timestamp);
  const dateString = timeAgo.format(longDate);
  return dateString;
};

// new Date().getFullYear()

export const getDaysInMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return new Date(year, month, 0).getDate();
};

// 캘리포니아 시간
export const getCaTime = () => {
  const date = new Date();
  const now_utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  const ca_time = now_utc - 7 * 60 * 60 * 1000;
  return new Date(ca_time);
};

export const numberWithCommas = (x: number) =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
