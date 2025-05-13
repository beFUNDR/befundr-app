import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllDocumentsFromCollection } from "@/utils/firebaseClient";

// Récupérer toutes les missions d'un projet
const getAllMissionsByProjectId = async (projectId: string) => {
  try {
    const { results, error } = await getAllDocumentsFromCollection<Mission>(
      "missions"
    );
    if (error) throw error;
    return results.filter((m) => m.data.projectId === projectId);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des missions du projet:",
      error
    );
    throw error;
  }
};

// Récupérer toutes les missions faites par un utilisateur
const getAllMissionsByDoneByUserId = async (userId: string) => {
  try {
    const { results, error } = await getAllDocumentsFromCollection<Mission>(
      "missions"
    );
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

// Créer une mission
const createAMission = async (mission: MissionToCreate) => {
  const response = await fetch("/api/mission", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mission),
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de la mission");
  }
  return response.json();
};

export const useMission = () => {
  const queryClient = useQueryClient();

  // Hook pour récupérer les missions d'un projet
  const useMissionsByProjectId = (projectId: string) =>
    useQuery({
      queryKey: ["missionsByProject", projectId],
      queryFn: () => getAllMissionsByProjectId(projectId),
      enabled: !!projectId,
    });

  // Hook pour récupérer les missions faites par un utilisateur
  const useMissionsByDoneByUserId = (userId: string) =>
    useQuery({
      queryKey: ["missionsByUser", userId],
      queryFn: () => getAllMissionsByDoneByUserId(userId),
      enabled: !!userId,
    });

  // Hook pour créer une mission
  const createMissionMutation = useMutation({
    mutationFn: createAMission,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["missionsByProject", variables.projectId],
      });
    },
  });

  return {
    useMissionsByProjectId,
    useMissionsByDoneByUserId,
    createAMission: createMissionMutation.mutateAsync,
    isCreating: createMissionMutation.isPending,
    createError: createMissionMutation.error,
  };
};
