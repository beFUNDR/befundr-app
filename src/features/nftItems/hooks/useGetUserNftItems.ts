import { getNftItems } from "@/features/nftItems/services/nft-item-service";
import { useQuery } from "@tanstack/react-query";

export const useGetUserNftItems = (wallet?: string) => {
  return useQuery({
    queryKey: ["userAssets", wallet],
    queryFn: () => getNftItems(wallet!),
    enabled: !!wallet,
    retry: 1,
  });
};
