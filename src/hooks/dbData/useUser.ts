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
      console.error("Erreur lors de la récupération des utilisateurs:", error);
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
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
      throw error;
    }
  };

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
        throw new Error("Erreur lors de la récupération de l'utilisateur");
      }
      return await res.json();
    },
    enabled: !!wallet, // Ne lance la requête que si le wallet est défini
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
        throw new Error("Erreur lors de la mise à jour de l'utilisateur");
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
