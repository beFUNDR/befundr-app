import { confirmTransaction } from "@/utils/solanaUtils";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { BEFUNDR_PROGRAM_ID } from "../../../../anchor/src";
import { MintNftParams } from "./type";
import { publicKey } from "@coral-xyz/anchor/dist/cjs/utils";
import * as token from "@solana/spl-token";
import { getOrCreateATA, USDC_MINT_ADDRESS } from "@/utils/AtaUtils";

export const mintNft = async ({
    project,
    quantity,
    authority,
    payer,
    connection,
    sendTransaction,
    program
}: MintNftParams): Promise<any> => {
    const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("globals")],
        BEFUNDR_PROGRAM_ID
    );

    const [nftAllocationPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("nft_allocation"), new PublicKey(project.projectPda).toBuffer(), new PublicKey(authority).toBuffer()],
        BEFUNDR_PROGRAM_ID
    );


    const asset = new Keypair();
    const projectPda = new PublicKey(project.projectPda);

    const startNftMintRoundProjectTx = await program.methods
        .mintNft(quantity)
        .accountsPartial({
            project: projectPda,
            nftAllocation: nftAllocationPda,
            collection: project.nftCollection,
            asset: asset.publicKey,
            mplCoreProgram: new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"),
            globals: configPda,
            authority: authority,
            payer: payer,
            from: (await getOrCreateATA(payer, authority, connection, sendTransaction)).associatedToken,
            to: (await getOrCreateATA(payer, configPda, connection, sendTransaction)).associatedToken,
            usdcMint: USDC_MINT_ADDRESS,
            tokenProgram: token.TOKEN_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
        })
        .signers([asset])
        .rpc();

    await confirmTransaction(program, startNftMintRoundProjectTx);

    const response = await fetch("/api/project", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            project: { ...project },
        }),
    });

    if (!response.ok) {
        throw new Error("Error while updating the project status");
    }

    return {};
};
