import { PublicKey } from "@solana/web3.js";
import type { Befundr } from '../../../../anchor/src/index';
import { Program } from '@coral-xyz/anchor';

interface CreateProjectParams {
    project: ProjectToCreate;
    mainImageFile: File;
    logoFile: File;
    userPublicKey?: PublicKey | null;
    program: Program<Befundr>;
}

interface UpdateProjectParams {
    project: ProjectToUpdate;
    authority: PublicKey;
    payer: PublicKey;
    program: Program<Befundr>;
}

interface StartNftMintRoundProjectParams {
    project: ProjectToUpdate;
    nftMaxSupply: number;
    nftUsdcPrice: number;
    nftCollectionName: string;
    authority: PublicKey;
    payer: PublicKey;
    program: Program<Befundr>;
}