import { fetcher } from "@/shared/api/fetcher";

export const getUserNftItemsApi = async (wallet: string): Promise<any> => {
  const url = `/api/user/getAssets?wallet=${encodeURIComponent(wallet)}`;

  const response = await fetcher(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response;
};
