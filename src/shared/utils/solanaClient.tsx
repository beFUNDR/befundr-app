/**
 * SOLANA CLIENT UTILITY
 *
 * This module creates and exports a configured Solana client.
 * It handle rpc url export to handle interaction based on web3js
 */

import { clusterApiUrl, Connection } from "@solana/web3.js";

// Network moniker
export type SolanaMoniker =
  | "mainnet"
  | "devnet"
  | "testnet"
  | "localnet"
  | "custom";

// Known endpoints
const SOLANA_ENDPOINTS: Record<Exclude<SolanaMoniker, "custom">, string> = {
  mainnet: "https://api.mainnet-beta.solana.com",
  devnet: "https://api.devnet.solana.com",
  testnet: "https://api.testnet.solana.com",
  localnet: "http://127.0.0.1:8899",
};

// Get RPC URL
function getSolanaRpcUrl(moniker: SolanaMoniker, customUrl?: string): string {
  if (moniker === "custom") {
    if (!customUrl)
      throw new Error("customUrl is required when using 'custom' moniker");
    return customUrl;
  }
  return SOLANA_ENDPOINTS[moniker];
}

// 🎯 CHOOSE NETWORK HERE
const network: SolanaMoniker = "localnet";
const rpcUrl = getSolanaRpcUrl(network);

// SOLANA WEB3.JS CONNECTION OBJECT
const connection = new Connection(
  network === "localnet" ? "http://127.0.0.1:8899" : clusterApiUrl(network),
  "confirmed"
);

export const solanaClient = {
  network,
  rpcUrl,
  connection,
};
