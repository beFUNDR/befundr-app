import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllDocumentsFromCollection,
  getDocument,
} from "@/utils/firebaseClient";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAnchorProvider } from "@/providers/SolanaProvider";
import { createProject } from "./createProject";
import { getBefundrProgram } from "../../../../anchor/src";
import { CreateProjectParams } from "./type";
import { PublicKey } from "@solana/web3.js";
import { Project } from "../../../../type";

// Fonction utilitaire pure
export const getProjectsByUserId = async (userId: string) => {
  try {
    const { results, error } = await getAllDocumentsFromCollection<Project>(
      "projects"
    );
    if (error) {
      throw error;
    }
    // On filtre les projets par userId
    return results.filter((p) => p.data.userId === userId);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des projets de l'utilisateur:",
      error
    );
    throw error;
  }
};

// Hook react-query
export const useProjectsByUserId = (userId: string) =>
  useQuery({
    queryKey: ["projectsByUser", userId],
    queryFn: () => getProjectsByUserId(userId),
    enabled: !!userId,
  });

export const useProject = () => {
  const { publicKey, wallet } = useWallet();
  const queryClient = useQueryClient();

  const provider = useAnchorProvider();
  const befundrProgram = getBefundrProgram(provider);

  //* QUERY
  const getAllProjects = async () => {
    try {
      const { results, error } = await getAllDocumentsFromCollection<Project>(
        "projects"
      );
      if (error) {
        throw error;
      }
      return results;
    } catch (error) {
      console.error("Erreur lors de la récupération des projets:", error);
      throw error;
    }
  };

  const getProject = async (projectId: string) => {
    try {
      const { result, error } = await getDocument<Project>(
        "projects",
        projectId
      );
      if (error) {
        throw error;
      }
      if (!result) {
        throw new Error("Projet non trouvé");
      }
      return { ...result, id: new PublicKey(projectId) };
    } catch (error) {
      console.error("Erreur lors de la récupération du projet:", error);
      throw error;
    }
  };

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const projectQuery = (projectId: string) =>
    useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getProject(projectId),
      enabled: !!projectId,
    });

  const createProjectMutation = useMutation({
    mutationFn: (createProjectParams: CreateProjectParams) => {
      return createProject({ ...createProjectParams, userPublicKey: publicKey, program: befundrProgram });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  /*const approveProjectMutation = useMutation({
    mutationFn: approveProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });*/

  return {
    createProject: createProjectMutation.mutateAsync,
    isCreating: createProjectMutation.isPending,
    error: createProjectMutation.error,
    projects: projectsQuery.data,
    isLoadingProjects: projectsQuery.isLoading,
    projectsError: projectsQuery.error,
    getProject: projectQuery,
  };
};
