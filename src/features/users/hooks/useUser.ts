import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getAllUsers,
  getUser,
  getUsers,
  updateUser,
} from "@/features/users/services/UserService";

//* QUERIES
// Get all users
export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

// Get a single user
export const useGetUser = (userId?: string) =>
  useQuery({
    queryKey: ["users", userId],
    queryFn: () => getUser(userId!),
    enabled: !!userId,
  });

// Get multiple users
export const useGetUsers = (userIds: string[]) =>
  useQuery({
    queryKey: ["users", userIds],
    queryFn: () => getUsers(userIds),
    enabled: userIds.length > 0,
  });

//* MUTATIONS
// Update user
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
