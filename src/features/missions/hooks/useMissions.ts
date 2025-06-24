import {
  createMission,
  deleteMissionById,
  getMissionById,
  getMissionsByAssignee,
  getMissionsByProjectId,
  updateMission,
} from "@/features/missions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useMission() {
  const queryClient = useQueryClient();

  //* QUERIES
  // Get a mission by id

  const useGetMissionById = (missionId: string) =>
    useQuery({
      queryKey: ["mission", missionId],
      queryFn: () => getMissionById(missionId),
      enabled: !!missionId,
    });

  // Get all missions by projectId

  const useGetMissionsByProjectId = (projectId: string) =>
    useQuery({
      queryKey: ["missionsByProject", projectId],
      queryFn: () => getMissionsByProjectId(projectId),
    });

  //* MUTATIONS
  // Create a mission

  const useCreateMission = useMutation({
    mutationFn: createMission,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["missionsByProject", variables.projectId],
      });
    },
  });

  const useMissionsByDoneByUserId = (userId: string) =>
    useQuery({
      queryKey: ["missionsByUser", userId],
      queryFn: () => getMissionsByAssignee(userId),
      enabled: !!userId,
    });

  const useEditMission = useMutation({
    mutationFn: updateMission,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["missionsByProject", variables.projectId],
      });
    },
  });

  const useDeleteMission = useMutation({
    mutationFn: ({
      missionId,
      projectId,
    }: {
      missionId: string;
      projectId: string;
    }) => deleteMissionById(missionId),
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
