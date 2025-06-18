import {
  useQuery,
  useMutation,
  useQueryClient,
  useQuery as rqUseQuery,
} from "@tanstack/react-query";
import {
  getAllDocumentsFromCollection,
  getDocument,
  getDocumentsWithQuery,
} from "@/utils/firebaseClient";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/utils/firebaseClient";
import toast from "react-hot-toast";

//* QUERIES
// Get all users
const getAllUsers = async () => {
  try {
    const { results, error } =
      await getAllDocumentsFromCollection<User>("users");
    if (error) throw error;

    return results;
  } catch (error) {
    console.error("Error while getting all users:", error);
    throw error;
  }
};

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

// Get a single user
const getUser = async (userId: string) => {
  try {
    const { result, error } = await getDocument<User>("users", userId);
    if (error) throw error;
    return result;
  } catch (error) {
    console.error("Error while getting user:", error);
    throw error;
  }
};

export const useGetUser = (userId?: string) =>
  useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId || ""),
    enabled: !!userId,
  });

// Get multiple users
const getUsers = async (userIds: string[]) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("wallet", "in", userIds));
    const { results, error } = await getDocumentsWithQuery<User>(q as any);
    if (error) throw error;
    return results;
  } catch (error) {
    console.error("Error while getting users:", error);
    throw error;
  }
};

export const useGetUsers = (userIds: string[]) =>
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

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["user", variables.wallet],
      });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error("Error while updating user:", error);
      toast.error("Error while updating user");
    },
  });
};

export const getUserAssets = async (wallet: string) => {
  const res = await fetch("/api/user/getAssets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ wallet }),
  });
  if (!res.ok) {
    throw new Error("Error while fetching user assets");
  }
  return await res.json();
};

export const useGetUserAssets = (
  wallet: string | undefined,
  enabled = true
) => {
  return rqUseQuery({
    queryKey: ["userAssets", wallet],
    queryFn: () => (wallet ? getUserAssets(wallet) : Promise.resolve(null)),
    enabled: !!wallet && enabled,
    retry: 1,
  });
};
