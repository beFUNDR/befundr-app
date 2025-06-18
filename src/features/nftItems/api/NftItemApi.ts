export const getUserNftItemsApi = async (wallet: string): Promise<any> => {
  const url = `/api/user/getAssets?wallet=${encodeURIComponent(wallet)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error while fetching user NFT items");
  }
  return await response.json();
};
