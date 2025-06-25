import { getDocumentsWithQuery } from "@/shared/utils/firebase-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, query, where, getFirestore } from "firebase/firestore";
import firebase_app from "@/lib/firebase/firebase-init";
import { fetcher } from "@/shared/api/fetcher";

const db = getFirestore(firebase_app);

export function useMissionApplication() {
  const queryClient = useQueryClient();

  //* QUERIES
  // Get all applications by mission
  const getMissionApplicationsByMission = async (missionId: string) => {
    try {
      const applicationsRef = collection(db, "applications");
      const q = query(applicationsRef, where("missionId", "==", missionId));
      const { results, error } = await getDocumentsWithQuery(q);
      if (error) throw error;
      return results.map((result) => ({
        data: result as MissionApplication,
        id: result.id,
      }));
    } catch (error) {
      console.error("Error while getting applications by mission:", error);
      throw error;
    }
  };

  const useGetMissionApplicationsByMission = (missionId: string) =>
    useQuery({
      queryKey: ["missionApplicationsByMission", missionId],
      queryFn: () => getMissionApplicationsByMission(missionId),
    });

  // Get all applications by userId
  const getMissionApplicationsByUser = async (userId: string) => {
    try {
      const applicationsRef = collection(db, "applications");
      const q = query(applicationsRef, where("userId", "==", userId));
      const { results, error } = await getDocumentsWithQuery(q);
      if (error) throw error;
      return results.map((result) => ({
        data: result as MissionApplication,
        id: result.id,
      }));
    } catch (error) {
      console.error("Error while getting applications by user:", error);
      throw error;
    }
  };

  const useGetMissionApplicationsByUser = (userId: string) =>
    useQuery({
      queryKey: ["missionApplicationsByUser", userId],
      queryFn: () => getMissionApplicationsByUser(userId),
    });

  //* MUTATIONS
  // Create an application
  const createApplication = async ({
    application,
    projectId,
  }: {
    application: Omit<MissionApplication, "status" | "createdAt">;
    projectId: string;
  }) => {
    const response = await fetcher("/api/mission-application", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      bodyParams: { ...application },
    });
    return response;
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
    const response = await fetcher(`/api/mission-application/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      bodyParams: { applicationId, status },
    });

    return response;
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

  // Delete an application
  const deleteApplication = async ({
    applicationId,
    missionId,
    userId,
  }: {
    applicationId: string;
    missionId: string;
    userId: string;
  }) => {
    const response = await fetcher(`/api/mission-application/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      bodyParams: { applicationId, missionId, userId },
    });

    return response;
  };

  const useDeleteApplication = useMutation({
    mutationFn: deleteApplication,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["missionApplicationsByMission", variables.missionId],
      });
      queryClient.invalidateQueries({
        queryKey: ["missionApplicationsByUser", variables.userId],
      });
    },
  });

  return {
    useGetMissionApplicationsByMission,
    useGetMissionApplicationsByUser,
    useCreateApplication,
    useUpdateApplicationStatus,
    useDeleteApplication,
  };
}
