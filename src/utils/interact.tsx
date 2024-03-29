import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { MerkleTree } from "merkletreejs";

import { keccak256 } from "web3-utils";
import { OG_MERKLE_INFO, WL_MERKLE_INFO } from "../constants/merkleRoot";
import { getOgPolicy, getPublicPolicy, getWlPolicy } from "./proxyInteract";
import { getMintTimeDiff } from "./common";
import { IMintPolicy } from "../interfaces/interact";

import {
  config,
  MINT_NFT_ABI,
  MINT_NFT_ADDRESS,
  PROXY_ABI,
  PROXY_CONTRACT_ADDRESS,
} from "../web3Config";

// TODO: og랑 wl 둘 다 민팅 가능 횟수 체크해서 숫자만큼 민팅했으면 민팅 불가능하게 하기

export const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_RPC_URL!);

const mintNFTContract = new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_ADDRESS);
const proxyContract = new web3.eth.Contract(PROXY_ABI, PROXY_CONTRACT_ADDRESS);

export const getWlClaimed = async (wallet: string): Promise<number> => {
  const wlClaimed = await mintNFTContract.methods.wlClaimed(wallet).call();
  return Number(wlClaimed);
};

export const getOgClaimed = async (wallet: string): Promise<number> => {
  const ogClaimed = await mintNFTContract.methods.ogClaimed(wallet).call();
  return Number(ogClaimed);
};

export const getTotalMinted = async () => {
  const totalMinted = await mintNFTContract.methods.totalSupply().call();
  return totalMinted;
};

export const getMaxSupply = async () => {
  const maxSupply = await proxyContract.methods.getMaxSupply().call();
  return maxSupply;
};

export const isPausedState = async () => {
  const paused = await proxyContract.methods.paused().call();
  return paused;
};

export const isPublicSaleState = async () => {
  try {
    const publicSale = await proxyContract.methods.publicM().call();
    return publicSale;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const isOgSaleState = async () => {
  try {
    const ogSale = await proxyContract.methods.ogsaleM().call();
    return ogSale;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const isPreSaleState = async () => {
  const preSale = await proxyContract.methods.presaleM().call();
  return preSale;
};

export const getPrice = async () => {
  const price = await proxyContract.methods.price().call();
  return price;
};

export const presaleMint = async (mintAmount: number, totalPrice: string) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: "To be able to mint, you need to connect your wallet",
    };
  }
  const _wallet = window.ethereum.selectedAddress;

  const { wlMerkleTree, wlRoot } = WL_MERKLE_INFO;

  const merkleProofResponse = merkleProofCompliance({
    merkleTree: wlMerkleTree,
    root: wlRoot,
    wallet: _wallet,
    mintType: "wl",
  });
  if (!merkleProofResponse.success) return merkleProofResponse;
  const proof = merkleProofResponse.proof;

  const mintPolicy = await getWlPolicy();
  const mintTimeResponse = mintTimeCompliance(mintPolicy, "Wl");
  if (!mintTimeResponse.success) return mintTimeResponse;
  // TODO: 토큰 몇개 민팅했는지도 체크하는 기능 만들기

  const wlClaimed = await getWlClaimed(_wallet);
  const availableTokens = config.presaleMaxMintAmount - wlClaimed;
  if (availableTokens === 0)
    return {
      success: false,
      status: "You have already minted all of your tokens",
    };

  const nonce = await web3.eth.getTransactionCount(_wallet, "latest");
  // console.log(window.ethereum.selectedAddress, mintAmount, proof);
  // Set up our Ethereum transaction
  const tx = {
    to: config.MINT_NFT_ADDRESS,
    from: _wallet,
    value: parseInt(web3.utils.toWei(String(totalPrice), "ether")).toString(16), // hex
    // .publicSaleMint(mintAmount, wallet)
    data: mintNFTContract.methods
      .presaleMint(mintAmount, _wallet, _wallet, proof)
      .encodeABI(),
    nonce: nonce.toString(16),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    return {
      success: true,
      status: (
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://etherscan.io/tx/${txHash}`}</p>
        </a>
      ),
    };
  } catch (error: any) {
    return {
      success: false,
      status: "😞 Smth went wrong:" + error.message,
    };
  }
};

export const ogSaleMint = async (mintAmount: number) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: "To be able to mint, you need to connect your wallet",
    };
  }

  const _wallet = window.ethereum.selectedAddress;
  const { ogMerkleTree, ogRoot } = OG_MERKLE_INFO;
  const merkleProofResponse = merkleProofCompliance({
    merkleTree: ogMerkleTree,
    root: ogRoot,
    wallet: _wallet,
    mintType: "og",
  });
  if (!merkleProofResponse.success) return merkleProofResponse;
  const proof = merkleProofResponse.proof;

  const mintPolicy = await getOgPolicy();
  const mintTimeResponse = mintTimeCompliance(mintPolicy, "Og");
  if (!mintTimeResponse.success) return mintTimeResponse;

  const ogClaimed = await getOgClaimed(_wallet);
  const availableTokens = config.ogMaxMintAmount - ogClaimed;
  if (availableTokens === 0)
    return {
      success: false,
      status: "You have already minted all of your tokens",
    };

  const nonce = await web3.eth.getTransactionCount(_wallet, "latest");

  // Set up our Ethereum transaction
  const tx = {
    to: config.MINT_NFT_ADDRESS,
    from: _wallet,
    value: parseInt(
      web3.utils.toWei(String(config.ogPrice * mintAmount), "ether")
    ).toString(16), // hex
    data: mintNFTContract.methods.ogSaleMint(proof).encodeABI(),
    nonce: nonce.toString(16),
  };

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    return {
      success: true,
      status: (
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://etherscan.io/tx/${txHash}`}</p>
        </a>
      ),
    };
  } catch (error: any) {
    return {
      success: false,
      status: "😞 Smth went wrong:" + error.message,
    };
  }
};

export const publicMint = async (
  mintAmount: number,
  wallet: string,
  price: string
) => {
  try {
    if (!window.ethereum.selectedAddress) {
      return {
        success: false,
        status: "To be able to mint, you need to connect your wallet",
      };
    }

    const mintPolicy = await getPublicPolicy();
    const mintTimeResponse = mintTimeCompliance(mintPolicy, "Public");
    if (!mintTimeResponse.success) return mintTimeResponse;

    // get nounce for preventing replay attacks
    const nonce = await web3.eth.getTransactionCount(
      window.ethereum.selectedAddress,
      "latest"
    );

    // Set up our Ethereum transaction
    const tx = {
      to: config.MINT_NFT_ADDRESS,
      from: window.ethereum.selectedAddress,
      value: parseInt(web3.utils.toWei(String(price), "ether")).toString(16), // hex
      data: mintNFTContract.methods
        .publicSaleMint(mintAmount, wallet, wallet)
        .encodeABI(),
      nonce: nonce.toString(16),
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    return {
      success: true,
      status: (
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://etherscan.io/tx/${txHash}`}</p>
        </a>
      ),
    };
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      status: "😞 Smth went wrong:" + error.message,
    };
  }
};

const mintTimeCompliance = (
  mintPolicy: IMintPolicy | null,
  mintType: string
) => {
  if (!mintPolicy)
    return {
      success: false,
      status: `${mintType} mint config is not set`,
    };

  const { startTime, endTime } = mintPolicy;
  const isStarted = getMintTimeDiff(startTime) < 0;
  const isEnded = getMintTimeDiff(endTime) < 0;

  switch (true) {
    case !isStarted:
      return {
        success: false,
        status: `${mintType} mint is not started yet`,
      };
    case isEnded:
      return {
        success: false,
        status: `${mintType} mint is ended`,
      };
    default:
      return {
        success: true,
        status: `${mintType} mint is ongoing`,
      };
  }
};

export const initMintTimeCompliance =
  async (): Promise<IInitMintTimeComplianceResponse> => {
    try {
      const publicPolicy = await getPublicPolicy();
      const ogPolicy = await getOgPolicy();
      const wlPolicy = await getWlPolicy();

      const publicMintTimeResponse = mintTimeCompliance(publicPolicy, "Public");
      const ogMintTimeResponse = mintTimeCompliance(ogPolicy, "Og");
      const wlMintTimeResponse = mintTimeCompliance(wlPolicy, "Whitelist");
      return {
        publicMintTimeResponse,
        ogMintTimeResponse,
        wlMintTimeResponse,
      };
    } catch (error: any) {
      return {
        publicMintTimeResponse: mintTimeResponseInit,
        ogMintTimeResponse: mintTimeResponseInit,
        wlMintTimeResponse: mintTimeResponseInit,
      };
    }
  };

const mintTimeResponseInit = {
  success: false,
  status: "Mint config is not set",
};

interface IInitMintTimeComplianceResponse {
  publicMintTimeResponse: IMintTimeResponse;
  ogMintTimeResponse: IMintTimeResponse;
  wlMintTimeResponse: IMintTimeResponse;
}

interface IMintTimeResponse {
  success: boolean;
  status: string;
}

interface MerkleProofComplianceProps {
  merkleTree: MerkleTree;
  root: string;
  wallet: string;
  mintType: "og" | "wl";
}

const merkleProofCompliance = ({
  merkleTree,
  root,
  wallet,
  mintType,
}: MerkleProofComplianceProps) => {
  const leaf = keccak256(wallet);
  const proof = merkleTree.getHexProof(leaf);

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root);

  return isValid
    ? { success: true, proof }
    : {
        success: false,
        status: `Invalid Merkle Proof || you're not ${mintType}`,
        proof: [],
      };
};

export const tokensOfOwner = async (wallet: string): Promise<string[]> => {
  try {
    const tokens = await mintNFTContract.methods.tokensOfOwner(wallet).call();
    return tokens;
  } catch (error: any) {
    console.log(error.message);
    return [];
  }
};
