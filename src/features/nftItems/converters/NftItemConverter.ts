import {
  NftItemDocumentSchema,
  NftItemSchema,
} from "@/features/nftItems/schemas/nftItem.schema";
import {
  NftItemDocument,
  NftItem,
} from "@/features/nftItems/types/nftItem.types";

export const convertNftItemFromDocument = (doc: NftItemDocument): NftItem => {
  const parsedNftItemDocument = NftItemDocumentSchema.array().parse(doc);

  return NftItemSchema.parse(parsedNftItemDocument);
};

export const convertNftItemsFromDocuments = (
  docs: NftItemDocument[]
): NftItem[] => {
  const parsedNftItemDocument = NftItemDocumentSchema.array().parse(docs);

  return NftItemSchema.array().parse(parsedNftItemDocument);
};
