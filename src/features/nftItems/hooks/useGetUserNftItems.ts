import { getNftItems } from "@/features/nftItems/services/nft-item-service";
import { useQuery as rqUseQuery } from "@tanstack/react-query";

export const useGetUserNftItems = (wallet?: string) => {
  return rqUseQuery({
    queryKey: ["userAssets", wallet],
    queryFn: () => getNftItems(wallet!),
    enabled: !!wallet,
    retry: 1,
  });
};
