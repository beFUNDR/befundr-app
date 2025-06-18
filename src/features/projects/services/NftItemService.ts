import { getUserNftItemsApi } from "@/features/nftItems/api/NftItemApi";
import { convertNftItemsFromDocuments } from "@/features/nftItems/converters/NftItemConverter";
import { NftItem } from "@/features/nftItems/types/nftItem.types";

export const getNftItems = async (userId: string): Promise<NftItem[]> => {
  try {
    const nftItemsDocuments = await getUserNftItemsApi(userId);
    const rawItems = nftItemsDocuments.result.items;

    const nftItems = convertNftItemsFromDocuments(rawItems);
    return nftItems;
  } catch (error) {
    console.error(`Error while getting NFT items for user: ${userId}`, error);
    throw error;
  }
};
