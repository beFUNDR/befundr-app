import { confirmTransaction } from "@/utils/solanaUtils";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { BEFUNDR_PROGRAM_ID } from "../../../../anchor/src";
import { UpdateProjectParams } from "./type";
import { ProjectStatus } from "@/data/ProjectStatus";

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
    const projectPda = project.projectPda;
    const approveProjectTx = await program.methods
        .approveProject()
        .accountsPartial({
            globals: configPda,
            project: projectPda,
            authority: authority,
            systemProgram: SystemProgram.programId,
        })
        .signers([])
        .rpc({ skipPreflight: true });
    await confirmTransaction(program, approveProjectTx);

    console.log("Project approved", await program.account.project.fetch(projectPda));

    const response = await fetch("/api/project", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            project: { ...project, status: ProjectStatus.Published, projectPda: projectPda },
        }),
    });

    if (!response.ok) {
        throw new Error("Error while updating the project status");
    }



    return {};
};
