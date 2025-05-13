import { getProvider, Program } from "@coral-xyz/anchor";
import web3, { BlockheightBasedTransactionConfirmationStrategy, RpcResponseAndContext, SignatureResult, TransactionSignature } from "@solana/web3.js";
import { Befundr, BefundrIDL } from "./index";

const { Keypair, LAMPORTS_PER_SOL, SystemProgram } = web3;

export const LAMPORTS_INIT_BALANCE = 1000 * LAMPORTS_PER_SOL; // 1000 SOL per wallet

export const createUserWalletWithSol = async (program): Promise<web3.Keypair> => {
    const wallet = new Keypair();
    const tx = await program.provider.connection.requestAirdrop(wallet.publicKey, LAMPORTS_INIT_BALANCE);
    await confirmTransaction(program, tx);

    return wallet;
}

export const confirmTransaction = async (program: Program<Befundr>, tx: TransactionSignature): Promise<RpcResponseAndContext<SignatureResult> | void> => {

    const latestBlockhash = await program.provider.connection.getLatestBlockhash();
    const confirmationStrategy: BlockheightBasedTransactionConfirmationStrategy = { ...latestBlockhash, signature: tx };

    return await program.provider.connection.confirmTransaction(confirmationStrategy, "confirmed");
}

export const initAdmin = async () => {
    // Provider Anchor
    const provider = getProvider();

    // Instance du programme
    const program = new Program(BefundrIDL as Befundr, provider);

    const admin = await createUserWalletWithSol(program);

    await program.methods
        .updateAdmin([admin.publicKey])
        .accountsPartial({
            authority: admin.publicKey,
            payer: admin.publicKey,
            systemProgram: SystemProgram.programId,
        })
        .signers([admin])
        .rpc();

    console.log("Instruction envoyée avec succès");

}

initAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
}
).finally(() => {
    console.log("Fin du script");
    process.exit(0);
}
);
