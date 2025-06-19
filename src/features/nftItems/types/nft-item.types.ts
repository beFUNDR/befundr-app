import { MinimalNFTSchema } from "@/features/nftItems/schemas/nft-item.schema";
import z from "zod";

export type NftItem = z.infer<typeof MinimalNFTSchema>;

export type NftItemDocument = z.infer<typeof MinimalNFTSchema>;
