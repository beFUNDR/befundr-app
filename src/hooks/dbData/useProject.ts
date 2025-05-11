import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fileToBase64,
  getAllDocumentsFromCollection,
  getDocument,
} from "@/utils/firebaseClient";
import { useWallet } from "@solana/wallet-adapter-react";

interface ProjectToCreate {
  userId: string;
  name: string;
  category: string;
  mainImage?: string;
  logo?: string;
  description?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  telegram?: string;
}

interface CreateProjectParams {
  project: ProjectToCreate;
  mainImageFile: File;
  logoFile: File;
}

export const useProject = () => {
  const { publicKey } = useWallet();
  const queryClient = useQueryClient();

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
      return result;
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

  //* MUTATION
  const createProject = async ({
    project,
    mainImageFile,
    logoFile,
  }: CreateProjectParams) => {
    if (!publicKey) {
      throw new Error("Connect your wallet");
    }

    const mainImageBase64 = await fileToBase64(mainImageFile);
    const logoBase64 = await fileToBase64(logoFile);

    const response = await fetch("/api/project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project,
        mainImageBase64,
        logoBase64,
        publicKey: publicKey.toString(),
      }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la création du projet");
    }

    return response.json();
  };

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return {
    createProject: createProjectMutation.mutate,
    isCreating: createProjectMutation.isPending,
    error: createProjectMutation.error,
    projects: projectsQuery.data,
    isLoadingProjects: projectsQuery.isLoading,
    projectsError: projectsQuery.error,
    getProject: projectQuery,
  };
};
