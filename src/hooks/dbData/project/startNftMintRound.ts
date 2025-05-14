import { confirmTransaction } from "@/utils/solanaUtils";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { BEFUNDR_PROGRAM_ID } from "../../../../anchor/src";
import { ProjectStatus } from "@/data/ProjectStatus";
import { StartNftMintRoundProjectParams } from "./type";
import { BN } from "@coral-xyz/anchor";

export const startNftMintRound = async ({
    project,
    nftMaxSupply,
    nftUsdcPrice,
    nftCollectionName,
    authority,
    payer,
    program
}: StartNftMintRoundProjectParams): Promise<any> => {
    const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("globals")],
        BEFUNDR_PROGRAM_ID
    );

    const collection = new Keypair();


    const projectPda = new PublicKey(project.projectPda);

    const startNftMintRoundProjectTx = await program.methods
        .startNftMintRound(new BN(nftMaxSupply), new BN(nftUsdcPrice * 10 ** 6), nftCollectionName)
        .accountsPartial({
            project: projectPda,
            mplCoreProgram: new PublicKey("CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"),
            globals: configPda,
            collection: collection.publicKey,
            authority: authority,
            payer: payer,
            systemProgram: SystemProgram.programId,
        })
        .signers([collection])
        .rpc();

    await confirmTransaction(program, startNftMintRoundProjectTx);

    const response = await fetch("/api/project", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            project: { ...project, status: ProjectStatus.NftMintRound, nftCollection: collection.publicKey, nftUsdcPrice: nftUsdcPrice, nftMaxSupply: nftMaxSupply, nftCollectionName: nftCollectionName },
        }),
    });

    if (!response.ok) {
        throw new Error("Error while updating the project status");
    }



    return {};
};
