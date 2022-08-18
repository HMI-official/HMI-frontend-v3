import keccak256 from "keccak256";
import { MerkleTree } from "merkletreejs";
import { OG_MERKLE_INFO, WL_MERKLE_INFO } from "../constants/merkleRoot";
// import fs from "fs";
// import { IMerkleJson } from "../interfaces";

export const createTree = (wallets: Array<number | string>) => {
  const leaves = wallets.map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return tree;
};

export const getRoot = (tree: MerkleTree): string => buf2hex(tree.getRoot());

export const getLeaf = (wallet: any) => buf2hex(keccak256(wallet));

export const getProof = (tree: MerkleTree, leaf: string) =>
  tree.getProof(leaf).map((x) => buf2hex(x.data));

export const buf2hex = (x: Buffer) => "0x" + x.toString("hex");

export const getWlWalletIsValid = (wallet: string | null | undefined) => {
  if (!wallet) return false;
  const { wlMerkleTree, wlRoot } = WL_MERKLE_INFO;
  const leaf = keccak256(wallet);
  const proof = wlMerkleTree.getHexProof(leaf);
  // Verify Merkle Proof
  const isValid = wlMerkleTree.verify(proof, leaf, wlRoot);
  return isValid;
};

export const getWlProof = (wallet: string | null | undefined) => {
  if (!wallet) return null;
  const { wlMerkleTree } = WL_MERKLE_INFO;
  const leaf = keccak256(wallet);
  const proof = wlMerkleTree.getHexProof(leaf);
  // console.log(proof);
  return proof;
};
export const getOgWalletIsValid = (wallet: string) => {
  if (!wallet) return false;
  const { ogMerkleTree, ogRoot } = OG_MERKLE_INFO;
  const leaf = keccak256(wallet);
  const proof = ogMerkleTree.getHexProof(leaf);
  // Verify Merkle Proof
  const isValid = ogMerkleTree.verify(proof, leaf, ogRoot);
  return isValid;
};
