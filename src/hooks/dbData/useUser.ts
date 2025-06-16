import {
  useQuery,
  useMutation,
  useQueryClient,
  useQuery as rqUseQuery,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getAllDocumentsFromCollection,
  getDocument,
} from "@/utils/firebaseClient";

export const useUser = (wallet: string | undefined) => {
  const queryClient = useQueryClient();

  const getAllUsers = async () => {
    try {
      const { results, error } = await getAllDocumentsFromCollection<User>(
        "users"
      );
      if (error) {
        throw error;
      }
      return results;
    } catch (error) {
      console.error("Error while fetching users list:", error);
      throw error;
    }
  };

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  const getUser = async (userId: string) => {
    try {
      const { result, error } = await getDocument<User>("users", userId);
      if (error) {
        throw error;
      }
      if (!result) {
        return null;
      }
      return result;
    } catch (error) {
      console.error("Error while fetching user:", error);
      throw error;
    }
  };

  //TODO this should be removed as this logic is not clean, and the "user" query key is already used below
  const useUserQuery = (userId: string) =>
    useQuery({
      queryKey: ["user", userId],
      queryFn: () => getUser(userId),
      enabled: !!userId,
    });

  const query = useQuery({
    queryKey: ["user", wallet],
    queryFn: async () => {
      if (!wallet) return null;

      const res = await fetch(`/api/user?wallet=${wallet}`);
      if (res.status === 404) {
        return "not_found";
      }
      if (!res.ok) {
        throw new Error("Error while fetching user");
      }
      return await res.json();
    },
    enabled: !!wallet,
    retry: 1,
  });

  const mutation = useMutation({
    mutationFn: async (data: User) => {
      const res = await fetch("/api/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Error while updating user");
      }
      return await res.json();
    },
    onSuccess: () => {
      if (wallet) queryClient.invalidateQueries({ queryKey: ["user", wallet] });
      toast.success("User updated successfully");
    },
  });

  return {
    ...query,
    updateUser: mutation.mutateAsync,
    isUpdating: mutation.isPending,
    users: usersQuery.data,
    isLoadingUsers: usersQuery.isLoading,
    usersError: usersQuery.error,
    getUser: useUserQuery,
  };
};

export const getUserAssets = async (wallet: string) => {
  const res = await fetch("/api/user/getAssets", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ wallet }),
  });
  if (!res.ok) {
    throw new Error("Error while fetching user assets");
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
