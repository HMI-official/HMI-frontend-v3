import { config, MINT_NFT_ABI, MINT_NFT_ADDRESS } from "../web3Config";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { MerkleTree } from "merkletreejs";
import { keccak256 } from "web3-utils";
import { whitelist } from "../data/whitelist";
// import whitelist from ""
// const whitelist = require("../scripts/whitelist.js");

const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_RPC_URL!);

// const contract = require("../artifacts/contracts/BoredApe.sol/BoredApe.json");
const mintNFTContract = new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_ADDRESS);

// Calculate merkle root from the whitelist array
const leafNodes = whitelist.map((addr: string) => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
const root = merkleTree.getRoot();

export const getTotalMinted = async () => {
  const totalMinted = await mintNFTContract.methods.totalSupply().call();
  return totalMinted;
};

export const getMaxSupply = async () => {
  const maxSupply = await mintNFTContract.methods.maxSupply().call();
  return maxSupply;
};

export const isPausedState = async () => {
  const paused = await mintNFTContract.methods.paused().call();
  return paused;
};

export const isPublicSaleState = async () => {
  const publicSale = await mintNFTContract.methods.publicM().call();
  return publicSale;
};

export const isPreSaleState = async () => {
  const preSale = await mintNFTContract.methods.presaleM().call();
  return preSale;
};

export const getPrice = async () => {
  const price = await mintNFTContract.methods.price().call();
  return price;
};

export const presaleMint = async (mintAmount: number) => {
  if (!window.ethereum.selectedAddress) {
    return {
      success: false,
      status: "To be able to mint, you need to connect your wallet",
    };
  }

  const leaf = keccak256(window.ethereum.selectedAddress);
  const proof = merkleTree.getHexProof(leaf);

  // Verify Merkle Proof
  const isValid = merkleTree.verify(proof, leaf, root);

  if (!isValid) {
    return {
      success: false,
      status: "Invalid Merkle Proof - You are not on the whitelist",
    };
  }

  const nonce = await web3.eth.getTransactionCount(
    window.ethereum.selectedAddress,
    "latest"
  );

  // Set up our Ethereum transaction
  const tx = {
    to: config.GET_NFT_ADDRESS,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(config.price * mintAmount), "ether")
    ).toString(16), // hex
    data: mintNFTContract.methods
      .presaleMint(window.ethereum.selectedAddress, mintAmount, proof)
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

export const publicMint = async (mintAmount: number) => {
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
    value: parseInt(
      web3.utils.toWei(String(config.price * mintAmount), "ether")
    ).toString(16), // hex
    data: mintNFTContract.methods.publicSaleMint(mintAmount).encodeABI(),
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
