import { MinimalNFTSchema } from "@/features/nftItems/schemas/nft-item.schema";
import {
  NftItemDocument,
  NftItem,
} from "@/features/nftItems/types/nft-item.types";

export const convertNftItemFromDocument = (doc: NftItemDocument): NftItem => {
  const parsedNftItemDocument = MinimalNFTSchema.parse(doc);

  return MinimalNFTSchema.parse(parsedNftItemDocument);
};

export const convertNftItemsFromDocuments = (
  docs: NftItemDocument[]
): NftItem[] => {
  const parsedNftItemDocument = MinimalNFTSchema.array().parse(docs);

  return MinimalNFTSchema.array().parse(parsedNftItemDocument);
};
