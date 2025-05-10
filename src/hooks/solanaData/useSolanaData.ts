/**
 * SOLANA QUERY AND MUTATE HOOKS
 *
 * Hooks to get data from solana blockchain using tanstack query
 *
 */

import solanaClient from "@/utils/solanaClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Address, airdropFactory, lamports, LAMPORTS_PER_SOL } from "gill";
import toast from "react-hot-toast";

const { rpc, rpcSubscriptions } = solanaClient;

//* FETCH SOLANA BALANCE
const fetchSolanaBalance = async (address: string) => {
  const balanceResponse = await rpc.getBalance(address as Address).send();
  return Number(balanceResponse.value) / LAMPORTS_PER_SOL;
};

export const useFetchSolanaBalance = (address: string) => {
  return useQuery({
    queryKey: ["solanaBalance", address],
    queryFn: () => fetchSolanaBalance(address),
    enabled: !!address,
  });
};

//* AIRDROP
const fetchAirdrop = async (address: string) => {
  const airdropResponse = await airdropFactory({ rpc, rpcSubscriptions })({
    commitment: "confirmed",
    lamports: lamports(BigInt(LAMPORTS_PER_SOL)),
    recipientAddress: address as Address,
  });
  return airdropResponse;
};

export const useFetchAirdrop = (address: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => fetchAirdrop(address),
    onSuccess: () => {
      toast.success("Airdrop requested");
      queryClient.invalidateQueries({ queryKey: ["solanaBalance", address] }); // refetch balance
    },
    onError: () => {
      toast.error("Failed to request airdrop");
    },
  });
};
