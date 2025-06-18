import { Connection, PublicKey } from "@solana/web3.js";
import type { Befundr } from "@befundr/anchor";
import { Program } from "@coral-xyz/anchor";
import { WalletAdapterProps } from "@solana/wallet-adapter-base";
import z from "zod";
import {
  ProjectSchema,
  ProjectToCreateSchema,
} from "@/features/projects/schemas/project.schema";

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectToCreate = z.infer<typeof ProjectToCreateSchema>;

export interface CreateProjectParams {
  project: ProjectToCreate;
  mainImageFile: File;
  logoFile: File;
  imagesFiles?: File[];
  userPublicKey?: PublicKey | null;
  program?: Program<Befundr>;
}

export interface UpdateProjectParams {
  project: Project;
  dataToUpdate?: Partial<Project>;
  mainImageFile?: File;
  logoFile?: File;
  imagesFiles?: (File | string)[];
  userPublicKey: PublicKey | null;
}

export interface StartNftMintRoundProjectParams {
  project: any;
  nftMaxSupply: number;
  nftUsdcPrice: number;
  nftCollectionName: string;
  authority: PublicKey;
  payer: PublicKey;
  program: Program<Befundr>;
}

export interface StartIncubationProjectParams {
  project: any;
  authority: PublicKey;
  payer: PublicKey;
  program: Program<Befundr>;
}

export interface MintNftParams {
  project: any;
  quantity: number;
  authority: PublicKey;
  payer: PublicKey;
  connection: Connection;
  sendTransaction: WalletAdapterProps["sendTransaction"];
  program: Program<Befundr>;
}
