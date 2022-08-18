import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { IMintPolicy } from "../interfaces/interact";
import { PROXY_ABI, PROXY_CONTRACT_ADDRESS } from "../web3Config";

const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_RPC_URL!);
const proxyContract = new web3.eth.Contract(PROXY_ABI, PROXY_CONTRACT_ADDRESS);

export const getPublicPolicy = async (): Promise<IMintPolicy | null> => {
  try {
    const publicPolicy = await proxyContract.methods.publicPolicy().call();
    return publicPolicy;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getOgPolicy = async (): Promise<IMintPolicy | null> => {
  try {
    const ogPolicy = await proxyContract.methods.ogsalePolicy().call();
    return ogPolicy;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getWlPolicy = async (): Promise<IMintPolicy | null> => {
  try {
    const wlPolicy = await proxyContract.methods.presalePolicy().call();
    return wlPolicy;
  } catch (error) {
    console.log(error);
    return null;
  }
};
