import {
  NftItemDocumentSchema,
  NftItemSchema,
} from "@/features/nftItems/schemas/nftItem.schema";
import z from "zod";

export type NftItem = z.infer<typeof NftItemSchema>;

export type NftItemDocument = z.infer<typeof NftItemDocumentSchema>;
