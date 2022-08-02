import { whitelist } from "../data/whitelist";
import { keccak256 } from "web3-utils";
import { MerkleTree } from "merkletreejs";
import { oglist } from "../data/og";

const wlLeafNodes = whitelist.map((addr: string) => keccak256(addr));
const ogLeafNodes = oglist.map((addr: string) => keccak256(addr));
const wlMerkleTree = new MerkleTree(wlLeafNodes, keccak256, {
  sortPairs: true,
});
const ogMerkleTree = new MerkleTree(ogLeafNodes, keccak256, {
  sortPairs: true,
});
const wlRoot = wlMerkleTree.getRoot();
const ogRoot = ogMerkleTree.getRoot();

export const WL_MERKLE_INFO = { wlLeafNodes, wlMerkleTree, wlRoot };
export const OG_MERKLE_INFO = { ogLeafNodes, ogMerkleTree, ogRoot };
