import { Cluster, PublicKey } from "@solana/web3.js";
import BefundrIDL from "../target/idl/befundr.json";
import { AnchorProvider, Program } from "@coral-xyz/anchor";
import type { Befundr } from "../target/types/befundr";

export { Befundr, BefundrIDL };

export const BEFUNDR_PROGRAM_ID = new PublicKey(BefundrIDL.address);

export function getBefundrProgram(provider: AnchorProvider) {
  return new Program(BefundrIDL as Befundr, provider);
}

export function getBefundrProgramId(cluster: Cluster) {
  switch (cluster) {
    case "devnet":
    case "testnet":
    case "mainnet-beta":
    default:
      return BEFUNDR_PROGRAM_ID;
  }
}
