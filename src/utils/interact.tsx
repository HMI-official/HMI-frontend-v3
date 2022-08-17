import {
  config,
  MINT_NFT_ABI,
  MINT_NFT_ADDRESS,
  PROXY_ABI,
  PROXY_CONTRACT_ADDRESS,
} from "../web3Config";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { MerkleTree } from "merkletreejs";
import { keccak256 } from "web3-utils";
import { whitelist } from "../data/whitelist";
import { OG_MERKLE_INFO, WL_MERKLE_INFO } from "../constants/merkleRoot";
import { getLeaf, getProof } from "./merkleTree";
import { getRPCErrorMessage } from "./common";
// import whitelist from ""
// const whitelist = require("../scripts/whitelist.js");

export const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_RPC_URL!);

// const contract = require("../artifacts/contracts/BoredApe.sol/BoredApe.json");
const mintNFTContract = new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_ADDRESS);
const proxyContract = new web3.eth.Contract(PROXY_ABI, PROXY_CONTRACT_ADDRESS);

// Calculate merkle root from the whitelist array
// const wlLeafNodes = whitelist.map((addr: string) => keccak256(addr));
// const wlMerkleTree = new MerkleTree(wlLeafNodes, keccak256, {
// sortPairs: true,
// });
// const wlRoot = wlMerkleTree.getRoot();

// const ogRoot = "";

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

export const presaleMint = async (mintAmount: number) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: "To be able to mint, you need to connect your wallet",
    };
  }
  const _wallet = window.ethereum.selectedAddress;

  const { wlMerkleTree, wlRoot } = WL_MERKLE_INFO;

  const leaf = keccak256(_wallet);
  const proof = wlMerkleTree.getHexProof(leaf);

  // Verify Merkle Proof
  const isValid = wlMerkleTree.verify(proof, leaf, wlRoot);

  if (!isValid) {
    return {
      success: false,
      status: "Invalid Merkle Proof - You are not whitelisted yet",
    };
  }

  const nonce = await web3.eth.getTransactionCount(_wallet, "latest");
  // console.log(window.ethereum.selectedAddress, mintAmount, proof);
  // Set up our Ethereum transaction
  const tx = {
    to: config.MINT_NFT_ADDRESS,
    from: _wallet,
    value: parseInt(
      web3.utils.toWei(String(config.wlPrice * mintAmount), "ether")
    ).toString(16), // hex
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
          href={`https://rinkeby.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://rinkeby.etherscan.io/tx/${txHash}`}</p>
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
  const leaf = getLeaf(_wallet);
  const proof = getProof(ogMerkleTree, leaf);

  // Verify Merkle Proof
  const isValid = ogMerkleTree.verify(proof, leaf, ogRoot);
  // console.log(ogRoot);
  // console.log(`isValid: ${isValid}`);

  if (!isValid) {
    return {
      success: false,
      status: "Invalid Merkle Proof - You are not OG",
    };
  }

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
          href={`https://rinkeby.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://rinkeby.etherscan.io/tx/${txHash}`}</p>
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
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: "To be able to mint, you need to connect your wallet",
    };
  }

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

  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });

    return {
      success: true,
      status: (
        <a
          href={`https://rinkeby.etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          <p>✅ Check out your transaction on Etherscan:</p>
          <p>{`https://rinkeby.etherscan.io/tx/${txHash}`}</p>
        </a>
      ),
    };
  } catch (error: any) {
    // const reason = await getRPCErrorMessage(error);
    // let message = JSON.parse(error);
    console.log(error);
    return {
      success: false,
      status: "😞 Smth went wrong:" + error.message,
    };
  }
};
