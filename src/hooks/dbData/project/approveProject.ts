import { confirmTransaction } from "@/utils/solanaUtils";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { BEFUNDR_PROGRAM_ID } from "../../../../anchor/src";
import { UpdateProjectParams } from "./type";

export const approveProject = async ({
    project,
    authority,
    payer,
    program
}: UpdateProjectParams): Promise<any> => {
    const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("globals")],
        BEFUNDR_PROGRAM_ID
    );

    let config;
    config = await program.account.globals.fetch(configPda);

    const [projectPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("project"), config.createdProjectCounter.toArrayLike(Buffer, 'le', 8)],
        program.programId
    );

    const createProjectTx = await program.methods
        .approveProject()
        .accountsPartial({
            globals: configPda,
            project: projectPda,
            authority: authority,
            systemProgram: SystemProgram.programId,
        })
        .signers([])
        .rpc({ skipPreflight: true });
    await confirmTransaction(program, createProjectTx);

    console.log("Project approved", await program.account.project.fetch(projectPda));

    const response = await fetch("/api/project", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            project: { ...project, projectPda: projectPda },
        }),
    });

    if (!response.ok) {
        throw new Error("Error while updating the project status");
    }



    return {};
};
