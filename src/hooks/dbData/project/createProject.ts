import { fileToBase64 } from "@/utils/firebaseClient";
import { confirmTransaction } from "@/utils/solanaUtils";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { BEFUNDR_PROGRAM_ID } from "../../../../anchor/src";
import { CreateProjectParams } from "./type";

export const createProject = async ({
    project,
    mainImageFile,
    logoFile,
    userPublicKey,
}: CreateProjectParams): Promise<any> => {
    if (!userPublicKey) {
        throw new Error("Connect your wallet");
    }
    /*
        const [configPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("globals")],
            BEFUNDR_PROGRAM_ID
        );
    
        let config;
        try {
            console.log("Fetching config");
            config = await program.account.globals.fetch(configPda);
        } catch (error) {
            console.log("Config not found, creating it");
    
            //Admin not initialized yet, then we create it with the current user for test purposes
            const tx = await program.methods
                .updateAdmin([userPublicKey])
                .accountsPartial({
                    config: configPda,
                    payer: userPublicKey,
                    authority: userPublicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc({ skipPreflight: true });
    
            await confirmTransaction(program, tx);
            config = await program.account.globals.fetch(configPda);
        }
    
    
        const [projectPda] = PublicKey.findProgramAddressSync(
            [Buffer.from("project"), config.createdProjectCounter.toArrayLike(Buffer, 'le', 8)],
            program.programId
        );
    
        const createProjectTx = await program.methods
            .createProject("")
            .accountsPartial({
                globals: configPda,
                project: projectPda,
                payer: userPublicKey,
                authority: userPublicKey,
                systemProgram: SystemProgram.programId,
            })
            .signers([])
            .rpc({ skipPreflight: true });
        await confirmTransaction(program, createProjectTx);
    
        console.log("Project created", await program.account.project.fetch(projectPda));*/
    const mainImageBase64 = await fileToBase64(mainImageFile);
    const logoBase64 = await fileToBase64(logoFile);

    const response = await fetch("/api/project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            project: { ...project, userId: userPublicKey },
            mainImageBase64,
            logoBase64,
        }),
    });

    if (!response.ok) {
        throw new Error("Erreur lors de la création du projet");
    }
    return {};
};
