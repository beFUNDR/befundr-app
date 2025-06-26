import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Project } from "@/features/projects/types";
import { likeProject } from "@/features/projects/hooks/like-project";
import {
  createProject,
  getAllProjects,
  getProject,
  getProjectsByOwner,
  updateProject,
} from "@/features/projects/services/project-service";

export const useGetProjectById = (projectId: string) =>
  useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProject(projectId),
    enabled: !!projectId,
  });

// Hook react-query
export const useProjectsByUserId = (userId: string) =>
  useQuery({
    queryKey: ["projectsByUser", userId],
    queryFn: () => getProjectsByOwner(userId),
    enabled: !!userId,
  });

export const useGetProjects = () =>
  useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ project }: { project: Partial<Project> }) => {
      return createProject(project);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      project,
      mainImage,
      logo,
      images,
    }: {
      project: Partial<Project>;
      mainImage: string;
      logo: string;
      images: string[];
    }) => {
      return updateProject(project, mainImage, logo, images);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useLikeProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (projectId: string) => likeProject(projectId),
    onSuccess: (_, projectId) => {
      queryClient.invalidateQueries({
        queryKey: ["project", projectId],
      });
    },
  });
};
