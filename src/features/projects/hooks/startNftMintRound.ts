import { confirmTransaction } from "@/shared/utils/solanaUtils";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { BEFUNDR_PROGRAM_ID } from "@befundr/anchor";
import { ProjectStatus } from "@/features/projects/constants/projectStatus";
import { BN } from "@coral-xyz/anchor";
import { StartNftMintRoundProjectParams } from "@/features/projects/types";

export const startNftMintRound = async ({
  project,
  nftMaxSupply,
  nftUsdcPrice,
  nftCollectionName,
  authority,
  payer,
  program,
}: StartNftMintRoundProjectParams): Promise<any> => {
  const [configPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("globals")],
    BEFUNDR_PROGRAM_ID
  );

  const collection = new Keypair();
  let config;
  try {
    console.log("Fetching config");
    config = await program.account.globals.fetch(configPda);
  } catch (error) {
    console.log("Config not found, creating it");

    //Admin not initialized yet, then we create it with the current user for test purposes
    const tx = await program.methods
      .updateAdmin([authority])
      .accountsPartial({
        config: configPda,
        payer: authority,
        authority: authority,
        systemProgram: SystemProgram.programId,
      })
      .rpc({ skipPreflight: true });

    await confirmTransaction(program, tx);
    config = await program.account.globals.fetch(configPda);
  }

  const [projectPda] = PublicKey.findProgramAddressSync(
    [
      Buffer.from("project"),
      config.createdProjectCounter.toArrayLike(Buffer, "le", 8),
    ],
    program.programId
  );

  const startNftMintRoundProjectTx = await program.methods
    .startNftMintRound(
      new BN(nftMaxSupply),
      new BN(nftUsdcPrice * 10 ** 6),
      nftCollectionName
    )
    .accountsPartial({
      project: projectPda,
      mplCoreProgram: new PublicKey(
        "CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d"
      ),
      globals: configPda,
      collection: collection.publicKey,
      authority: authority,
      payer: payer,
      systemProgram: SystemProgram.programId,
    })
    .signers([collection])
    .rpc({ skipPreflight: true });

  await confirmTransaction(program, startNftMintRoundProjectTx);

  const response = await fetch("/api/project", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project: {
        ...project,
        status: ProjectStatus.NftMintRound,
        projectPda: projectPda,
        nftCollection: collection.publicKey,
        nftUsdcPrice: nftUsdcPrice,
        nftMaxSupply: nftMaxSupply,
        nftCollectionName: nftCollectionName,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Error while updating the project status");
  }

  return {};
};
