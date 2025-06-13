import { getAllDocumentsFromCollection } from "@/utils/firebaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useApplication() {
  const queryClient = useQueryClient();

  //* QUERIES
  // Get all applications by missionId
  const getApplicationsByMissionId = async (missionId: string) => {
    try {
      const { results, error } =
        await getAllDocumentsFromCollection<Application>("applications");
      if (error) throw error;
      return results.filter((a) => a.data.missionId === missionId);
    } catch (error) {
      console.error("Error while getting applications by missionId:", error);
      throw error;
    }
  };

  const useGetApplicationsByMissionId = (missionId: string) =>
    useQuery({
      queryKey: ["applicationsByMission", missionId],
      queryFn: () => getApplicationsByMissionId(missionId),
    });

  // Get all applications by userId
  const getApplicationsByUserId = async (userId: string) => {
    try {
      const { results, error } =
        await getAllDocumentsFromCollection<Application>("applications");
      if (error) throw error;
      return results.filter((a) => a.data.userId === userId);
    } catch (error) {
      console.error("Error while getting applications by userId:", error);
      throw error;
    }
  };

  const useGetApplicationsByUserId = (userId: string) =>
    useQuery({
      queryKey: ["applicationsByUser", userId],
      queryFn: () => getApplicationsByUserId(userId),
    });

  const getApplicationByMissionId = async (missionId: string) => {
    try {
      const { results, error } =
        await getAllDocumentsFromCollection<Application>("applications");
      if (error) throw error;
      return results.filter((a) => a.data.missionId === missionId);
    } catch (error) {
      console.error("Error while getting applications by missionId:", error);
      throw error;
    }
  };

  const useGetApplicationByMissionId = (missionId: string) =>
    useQuery({
      queryKey: ["applicationByMission", missionId],
      queryFn: () => getApplicationByMissionId(missionId),
    });

  //* MUTATIONS
  // Create an application
  const createApplication = async ({
    application,
    projectId,
  }: {
    application: Omit<Application, "status" | "createdAt">;
    projectId: string;
  }) => {
    const response = await fetch("/api/application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(application),
    });
    if (!response.ok) {
      throw new Error("Error while creating an application");
    }
    return response.json();
  };

  const useCreateApplication = useMutation({
    mutationFn: createApplication,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["applicationsByMission", variables.application.missionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["applicationsByUser", variables.application.userId],
      });
      queryClient.invalidateQueries({
        queryKey: ["missionsByProject", variables.projectId],
      });
    },
  });

  // Update application status
  const updateApplicationStatus = async ({
    applicationId,
    missionId,
    userId,
    status,
  }: {
    applicationId: string;
    missionId: string;
    userId: string;
    status: "accepted" | "rejected";
  }) => {
    const response = await fetch(`/api/application/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId, status }),
    });
    if (!response.ok) {
      throw new Error("Error while updating application status");
    }
    return response.json();
  };

  const useUpdateApplicationStatus = useMutation({
    mutationFn: updateApplicationStatus,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["applicationsByMission", variables.missionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["applicationsByUser", variables.userId],
      });
    },
  });

  return {
    useGetApplicationsByMissionId,
    useGetApplicationsByUserId,
    useGetApplicationByMissionId,
    useCreateApplication,
    useUpdateApplicationStatus,
  };
}
