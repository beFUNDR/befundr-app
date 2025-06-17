import { Program } from "@coral-xyz/anchor";
import {
  BlockheightBasedTransactionConfirmationStrategy,
  PublicKey,
  RpcResponseAndContext,
  SignatureResult,
  TransactionSignature,
} from "@solana/web3.js";
import { Befundr } from "../../anchor/src";

export const confirmTransaction = async (
  program: Program<Befundr>,
  tx: TransactionSignature
): Promise<RpcResponseAndContext<SignatureResult>> => {
  const latestBlockhash =
    await program.provider.connection.getLatestBlockhash();
  const confirmationStrategy: BlockheightBasedTransactionConfirmationStrategy =
    {
      ...latestBlockhash,
      signature: tx,
    };

  return await program.provider.connection.confirmTransaction(
    confirmationStrategy,
    "confirmed"
  );
};

export const getPda = (
  seed: Array<Buffer | Uint8Array>,
  programId: PublicKey
) => {
  const [pdaPublicKey] = PublicKey.findProgramAddressSync(seed, programId);

  return pdaPublicKey;
};
