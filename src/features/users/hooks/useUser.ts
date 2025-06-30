import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  createUser,
  getAllSkillsHubUsers,
  getAllUsers,
  getUser,
  getUsers,
  updateUser,
} from "@/features/users/services/user-service";

//* QUERIES
// Get all users
export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

// Get all skills hub users
export const useGetAllSkillsHubUsers = () =>
  useQuery({
    queryKey: ["skillsHubUsers"],
    queryFn: getAllSkillsHubUsers,
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

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: (_, user) => {
      queryClient.invalidateQueries({
        queryKey: ["user", user.wallet],
      });

      queryClient.invalidateQueries({
        queryKey: ["gameProgram", user.wallet],
      });
      toast.success("User created successfully");
    },
    onError: (error) => {
      console.error("Error while creating user:", error);
      toast.error("Error while creating user");
    },
  });
};

//* MUTATIONS
// Update user
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["users", variables.wallet],
      });
      await queryClient.invalidateQueries({
        queryKey: ["skillsHubUsers"],
      });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      console.error("Error while updating user:", error);
      toast.error("Error while updating user");
    },
  });
};
