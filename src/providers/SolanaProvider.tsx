"use client";

import { WalletError } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";
import { ReactNode, useCallback } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import solanaClient from "@/utils/solanaClient";

export const WalletButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  {
    ssr: false,
  }
);

export function SolanaProvider({ children }: { children: ReactNode }) {
  const { rpcUrl } = solanaClient;
  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);

  // use wallet connection hook to retrieve user data in db
  // useWalletConnection();

  return (
    <ConnectionProvider endpoint={rpcUrl}>
      <WalletProvider wallets={[]} onError={onError} autoConnect={true}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
