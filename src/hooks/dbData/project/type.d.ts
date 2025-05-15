import { Connection, PublicKey } from "@solana/web3.js";
import type { Befundr } from '../../../../anchor/src/index';
import { Program, Wallet } from '@coral-xyz/anchor';

interface CreateProjectParams {
    project: ProjectToCreate;
    mainImageFile: File;
    logoFile: File;
    userPublicKey?: PublicKey | null;
    program?: Program<Befundr>;
}

interface UpdateProjectParams {
    project: ProjectToUpdate;
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

interface StartIncubationProjectParams {
    project: ProjectToUpdate;
    authority: PublicKey;
    payer: PublicKey;
    program: Program<Befundr>;
}

interface MintNftParams {
    project: ProjectToUpdate;
    quantity: number;
    authority: PublicKey;
    payer: PublicKey;
    connection: Connection;
    sendTransaction: WalletAdapterProps['sendTransaction']
    program: Program<Befundr>;
}
