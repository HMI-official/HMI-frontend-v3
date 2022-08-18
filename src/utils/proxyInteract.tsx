import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { IMintPolicy } from "../interfaces/interact";
import { PROXY_ABI, PROXY_CONTRACT_ADDRESS } from "../web3Config";

const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_RPC_URL!);
const proxyContract = new web3.eth.Contract(PROXY_ABI, PROXY_CONTRACT_ADDRESS);

const getProcessedPolicy = (rawPolicy: IMintPolicy): IMintPolicy => {
  const policy: IMintPolicy = {
    ...rawPolicy,
    startTime: Number(rawPolicy.startTime),
    endTime: Number(rawPolicy.endTime),
    index: Number(rawPolicy.index),
  };
  return policy;
};

export const getPublicPolicy = async (): Promise<IMintPolicy | null> => {
  try {
    const _publicPolicy = await proxyContract.methods.publicPolicy().call();
    const publicPolicy: IMintPolicy = getProcessedPolicy(_publicPolicy);
    return publicPolicy;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getOgPolicy = async (): Promise<IMintPolicy | null> => {
  try {
    const _ogPolicy = await proxyContract.methods.ogsalePolicy().call();
    const ogPolicy: IMintPolicy = getProcessedPolicy(_ogPolicy);
    return ogPolicy;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getWlPolicy = async (): Promise<IMintPolicy | null> => {
  try {
    const _wlPolicy = await proxyContract.methods.presalePolicy().call();
    const wlPolicy: IMintPolicy = getProcessedPolicy(_wlPolicy);
    return wlPolicy;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getCurBlock = async (): Promise<number> => {
  const curBlock = await web3.eth.getBlockNumber();
  return Number(curBlock);
};
