import { getDocumentsWithQuery } from "@/utils/firebaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, query, where, getFirestore } from "firebase/firestore";
import firebase_app from "@/lib/firebase/firebaseInit";

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
    const response = await fetch("/api/missionapplication", {
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
    const response = await fetch(`/api/missionapplication/`, {
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
    const response = await fetch(`/api/missionapplication/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ applicationId, missionId, userId }),
    });
    if (!response.ok) {
      throw new Error("Error while deleting an application");
    }
    return response.json();
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
