import { config, MINT_NFT_ABI, MINT_NFT_ADDRESS } from "../web3Config";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { MerkleTree } from "merkletreejs";
import { keccak256 } from "web3-utils";
import { whitelist } from "../data/whitelist";
import { OG_MERKLE_INFO, WL_MERKLE_INFO } from "../constants/merkleRoot";
// import whitelist from ""
// const whitelist = require("../scripts/whitelist.js");

const web3 = createAlchemyWeb3(process.env.REACT_APP_ALCHEMY_RPC_URL!);

// const contract = require("../artifacts/contracts/BoredApe.sol/BoredApe.json");
const mintNFTContract = new web3.eth.Contract(MINT_NFT_ABI, MINT_NFT_ADDRESS);

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

export const isOgSaleState = async () => {
  const ogSale = await mintNFTContract.methods.ogSaleM().call();
  return ogSale;
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

  const { wlMerkleTree, wlRoot } = WL_MERKLE_INFO;

  const leaf = keccak256(window.ethereum.selectedAddress);
  const proof = wlMerkleTree.getHexProof(leaf);

  // Verify Merkle Proof
  const isValid = wlMerkleTree.verify(proof, leaf, wlRoot);

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
  console.log(window.ethereum.selectedAddress, mintAmount, proof);

  // Set up our Ethereum transaction
  const tx = {
    to: config.MINT_NFT_ADDRESS,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(config.wlPrice * mintAmount), "ether")
    ).toString(16), // hex
    // .publicSaleMint(mintAmount, wallet)
    data: mintNFTContract.methods
      .presaleMint(mintAmount, window.ethereum.selectedAddress, proof)
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
  const { ogMerkleTree, ogRoot } = OG_MERKLE_INFO;
  const leaf = keccak256(window.ethereum.selectedAddress);
  const proof = ogMerkleTree.getHexProof(leaf);

  // Verify Merkle Proof
  const isValid = ogMerkleTree.verify(proof, leaf, ogRoot);

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
    to: config.MINT_NFT_ADDRESS,
    from: window.ethereum.selectedAddress,
    value: parseInt(
      web3.utils.toWei(String(config.ogPrice * mintAmount), "ether")
    ).toString(16), // hex
    data: mintNFTContract.methods
      .ogSaleMint(window.ethereum.selectedAddress, mintAmount, proof)
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

export const publicMint = async (mintAmount: number, wallet: string) => {
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
    data: mintNFTContract.methods
      .publicSaleMint(mintAmount, wallet)
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
