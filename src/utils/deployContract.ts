import { createTree, getRoot } from "./merkleTree";
import { ContractFactory, ethers } from "ethers";
import { contractDeployConfig } from "../data/deployContract.config";
import { whitelist } from "../data/whitelist";

const getAccount = async () => {
  // const mnemonic = "<see-phrase>"; // seed phrase for your Metamask account
  // const provider = new ethers.providers.WebSocketProvider(
  //   process.env.REACT_APP_INFURA_API_KEY!
  // );
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  // const wallet = await new ethers.Wallet(privateKey, provider);
  // const _account = await wallet.connect(provider);
  return signer;
};

const tree = createTree(whitelist);
const root = getRoot(tree);

// Deploy an instance of the contract
export const deployContract = async () => {
  const signer = await getAccount();
  // console.log("signer:", signer);

  const factory = new ContractFactory(
    contractDeployConfig.abi,
    contractDeployConfig.bytecode,
    signer
  );
  // signer

  const contract = await factory.deploy(
    contractDeployConfig.BASE_URI,
    root,
    contractDeployConfig.proxyRegistryAddressRinkeby
  );
  console.log(contract.address);
  console.log(contract.deployTransaction);
  await contract.deployTransaction.wait();
  // await contract.value();
};
