import { confirmTransaction } from "@/utils/solanaUtils";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";
import { BEFUNDR_PROGRAM_ID } from "../../../../anchor/src";
import { ProjectStatus } from "@/data/ProjectStatus";
import { StartIncubationProjectParams } from "./type";
import { BN } from "@coral-xyz/anchor";

export const startIncubation = async ({
  project,
  authority,
  payer,
  program,
}: StartIncubationProjectParams): Promise<any> => {
  /*const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("globals")],
        BEFUNDR_PROGRAM_ID
    );

    const projectPda = new PublicKey(project.projectPda);

    const startNftMintRoundProjectTx = await program.methods
        .startIncubation()
        .accountsPartial({
            project: projectPda,
            globals: configPda,
            authority: authority,
            systemProgram: SystemProgram.programId,
        })
        .signers([])
        .rpc();

    await confirmTransaction(program, startNftMintRoundProjectTx);
*/
  const response = await fetch("/api/project", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project: { ...project, status: ProjectStatus.Incubation },
    }),
  });

  if (!response.ok) {
    throw new Error("Error while updating the project status");
  }

  return {};
};
