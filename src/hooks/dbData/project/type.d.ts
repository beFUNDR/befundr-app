import { PublicKey } from "@solana/web3.js";

interface CreateProjectParams {
    project: ProjectToCreate;
    mainImageFile: File;
    logoFile: File;
    userPublicKey?: PublicKey | null;
    program?: Program;
}