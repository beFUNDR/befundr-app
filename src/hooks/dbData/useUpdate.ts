import { fetcher } from "@/shared/api/fetcher";
import { getAllDocumentsFromCollection } from "@/shared/utils/firebase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useUpdate() {
  const queryClient = useQueryClient();

  //* QUERIES
  // Get all updates by projectId
  const getUpdatesByProjectId = async (projectId: string) => {
    try {
      const { results, error } =
        await getAllDocumentsFromCollection<Update>("updates");
      if (error) throw error;
      return results.filter((m) => m.data.projectId === projectId);
    } catch (error) {
      console.error("Error while getting updates by projectId:", error);
      throw error;
    }
  };

  const useGetUpdatesByProjectId = (projectId: string) =>
    useQuery({
      queryKey: ["updatesByProject", projectId],
      queryFn: () => getUpdatesByProjectId(projectId),
    });

  //* MUTATIONS
  // Create an update
  const createUpdate = async (update: CreateProjectUpdateDto) => {
    const response = await fetcher("/api/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      bodyParams: { update },
    });

    return response;
  };

  const useCreateUpdate = useMutation({
    mutationFn: createUpdate,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["updatesByProject", variables.projectId],
      });
    },
  });

  // Like an update
  const likeUpdate = async ({
    updateId,
    projectId, // use only for invalidating the query
  }: {
    updateId: string;
    projectId: string;
  }) => {
    const response = await fetcher(`/api/update/${updateId}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      bodyParams: {},
    });

    return response;
  };

  const useLikeUpdate = useMutation({
    mutationFn: likeUpdate,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["updatesByProject", variables.projectId],
      });
    },
  });

  const editUpdate = async ({
    updateId,
    projectId,
    title,
    message,
  }: {
    updateId: string;
    projectId: string;
    title: string;
    message: string;
  }) => {
    const response = await fetch(`/api/update/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updateId, projectId, title, message }),
    });
    if (!response.ok) {
      throw new Error("Error while editing an update");
    }
    return response.json();
  };

  const useEditUpdate = useMutation({
    mutationFn: editUpdate,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["updatesByProject", variables.projectId],
      });
    },
  });

  const deleteUpdate = async ({
    updateId,
    projectId, // use only for invalidating the query
  }: {
    updateId: string;
    projectId: string;
  }) => {
    const response = await fetch(`/api/update/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ updateId }),
    });
    if (!response.ok) {
      throw new Error("Error while deleting an update");
    }
    return response.json();
  };

  const useDeleteUpdate = useMutation({
    mutationFn: deleteUpdate,
    onSuccess: (_, variables) => {
      toast.success("Update deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["updatesByProject", variables.projectId],
      });
    },
  });

  return {
    useGetUpdatesByProjectId,
    useCreateUpdate,
    useLikeUpdate,
    useEditUpdate,
    useDeleteUpdate,
  };
}
