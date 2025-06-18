import {
  getAllDocumentsFromCollection,
  getDocument,
} from "@/shared/utils/firebaseClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useMission() {
  const queryClient = useQueryClient();

  //* QUERIES
  // Get a mission by id
  const getMissionById = async (missionId: string) => {
    const { result, error } = await getDocument<Mission>("missions", missionId);
    if (error) throw error;
    return result;
  };

  const useGetMissionById = (missionId: string) =>
    useQuery({
      queryKey: ["mission", missionId],
      queryFn: () => getMissionById(missionId),
      enabled: !!missionId,
    });

  // Get all missions by projectId
  const getMissionsByProjectId = async (projectId: string) => {
    try {
      const { results, error } =
        await getAllDocumentsFromCollection<Mission>("missions");
      if (error) throw error;
      return results.filter((m) => m.data.projectId === projectId);
    } catch (error) {
      console.error("Error while getting missions by projectId:", error);
      throw error;
    }
  };

  const useGetMissionsByProjectId = (projectId: string) =>
    useQuery({
      queryKey: ["missionsByProject", projectId],
      queryFn: () => getMissionsByProjectId(projectId),
    });

  //* MUTATIONS
  // Create a mission
  const createMission = async (mission: MissionToCreate) => {
    const response = await fetch("/api/mission", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mission),
    });
    if (!response.ok) {
      throw new Error("Error while creating a mission");
    }
    return response.json();
  };

  const useCreateMission = useMutation({
    mutationFn: createMission,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["missionsByProject", variables.projectId],
      });
    },
  });

  const getAllMissionsByDoneByUserId = async (userId: string) => {
    try {
      const { results, error } =
        await getAllDocumentsFromCollection<Mission>("missions");
      if (error) throw error;
      return results.filter((m) => m.data.doneBy === userId);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des missions de l'utilisateur:",
        error
      );
      throw error;
    }
  };

  const useMissionsByDoneByUserId = (userId: string) =>
    useQuery({
      queryKey: ["missionsByUser", userId],
      queryFn: () => getAllMissionsByDoneByUserId(userId),
      enabled: !!userId,
    });

  const editMission = async ({
    missionId,
    projectId,
    title,
    description,
    skill,
    isPaid,
  }: {
    missionId: string;
    projectId: string;
    title: string;
    description: string;
    skill: string;
    isPaid: boolean;
  }) => {
    const response = await fetch(`/api/mission/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        missionId,
        projectId,
        title,
        description,
        skill,
        isPaid,
      }),
    });
    if (!response.ok) {
      throw new Error("Error while editing a mission");
    }
    return response.json();
  };

  const useEditMission = useMutation({
    mutationFn: editMission,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["missionsByProject", variables.projectId],
      });
    },
  });

  const deleteMission = async ({
    missionId,
    projectId,
  }: {
    missionId: string;
    projectId: string;
  }) => {
    const response = await fetch(`/api/mission/`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ missionId }),
    });
    if (!response.ok) {
      throw new Error("Error while deleting a mission");
    }
    return response.json();
  };

  const useDeleteMission = useMutation({
    mutationFn: deleteMission,
    onSuccess: (_, variables) => {
      toast.success("Mission deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["missionsByProject", variables.projectId],
      });
    },
  });

  return {
    useGetMissionById,
    useGetMissionsByProjectId,
    useMissionsByDoneByUserId,
    useCreateMission,
    useEditMission,
    useDeleteMission,
  };
}
