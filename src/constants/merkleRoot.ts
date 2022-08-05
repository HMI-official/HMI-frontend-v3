import { whitelist } from "../data/whitelist";
import { oglist } from "../data/og";
import { createTree, getRoot } from "../utils/merkleTree";

// const wlLeafNodes = whitelist.map((addr: string) => keccak256(addr));
// const ogLeafNodes = oglist.map((addr: string) => keccak256(addr));
const wlMerkleTree = createTree(whitelist);
const ogMerkleTree = createTree(oglist);
const wlRoot = getRoot(wlMerkleTree);
const ogRoot = getRoot(ogMerkleTree);

export const WL_MERKLE_INFO = { wlMerkleTree, wlRoot };
export const OG_MERKLE_INFO = { ogMerkleTree, ogRoot };
