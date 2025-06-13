import {
  useQuery,
  useMutation,
  useQueryClient,
  useQuery as rqUseQuery,
} from "@tanstack/react-query";
import { getAllDocumentsFromCollection } from "@/utils/firebaseClient";

export function useUser(userId?: string) {
  const queryClient = useQueryClient();

  //* QUERIES
  // Get all users
  const getAllUsers = async () => {
    const { results, error } = await getAllDocumentsFromCollection<User>(
      "users"
    );
    return results;
  };

  const useGetAllUsers = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: getAllUsers,
    });

  // Get a single user
  const getUser = async (userId: string) => {
    try {
      const { results, error } = await getAllDocumentsFromCollection<User>(
        "users"
      );
      if (error) throw error;
      return results.find((u) => u.data.wallet === userId);
    } catch (error) {
      console.error("Error while getting user:", error);
      throw error;
    }
  };

  const useGetUser = (userId?: string) =>
    useQuery({
      queryKey: ["user", userId],
      queryFn: () => getUser(userId || ""),
      enabled: !!userId,
    });

  // Get multiple users
  const getUsers = async (userIds: string[]) => {
    try {
      const { results, error } = await getAllDocumentsFromCollection<User>(
        "users"
      );
      if (error) throw error;
      return results.filter((u) => userIds.includes(u.data.wallet));
    } catch (error) {
      console.error("Error while getting users:", error);
      throw error;
    }
  };

  const useGetUsers = (userIds: string[]) =>
    useQuery({
      queryKey: ["users", userIds],
      queryFn: () => getUsers(userIds),
      enabled: userIds.length > 0,
    });

  //* MUTATIONS
  // Update user
  const updateUser = async (user: User) => {
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Error while updating user");
    }
    return response.json();
  };

  const useUpdateUser = useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.wallet],
      });
    },
  });

  return {
    useGetUser,
    useGetUsers,
    useGetAllUsers,
    useUpdateUser,
  };
}

export const getUserAssets = async (wallet: string) => {
  const res = await fetch("/api/user/getAssets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet }),
  });
  if (!res.ok) {
    throw new Error("Erreur lors de la récupération des assets utilisateur");
  }
  return await res.json();
};

export const useUserAssets = (wallet: string | undefined, enabled = true) => {
  return rqUseQuery({
    queryKey: ["userAssets", wallet],
    queryFn: () => (wallet ? getUserAssets(wallet) : Promise.resolve(null)),
    enabled: !!wallet && enabled,
    retry: 1,
  });
};
