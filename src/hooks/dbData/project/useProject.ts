import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllDocumentsFromCollection,
  getDocument,
} from "@/utils/firebaseClient";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useAnchorProvider } from "@/providers/SolanaProvider";
import { createProject } from "./createProject";
import { getBefundrProgram } from "../../../../anchor/src";
import {
  StartIncubationProjectParams,
  StartNftMintRoundProjectParams,
  UpdateProjectParams,
} from "./type";
import { approveProject } from "./approveProject";
import { startNftMintRound } from "./startNftMintRound";
import { startIncubation } from "./startIncubation";
import { mintNft } from "./mintNft";
import { updateProject } from "./updateProject";

//* QUERIES
// Get a project by id
const getProjectById = async (projectId: string) => {
  const { result, error } = await getDocument<Project>("projects", projectId);
  if (error) throw error;
  return result;
};

const useGetProjectById = (projectId: string) =>
  useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    enabled: !!projectId,
  });

// Fonction utilitaire pure
export const getProjectsByUserId = async (userId: string) => {
  try {
    const { results, error } =
      await getAllDocumentsFromCollection<Project>("projects");
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
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  const queryClient = useQueryClient();

  const provider = useAnchorProvider();
  const befundrProgram = getBefundrProgram(provider);

  //* QUERY
  const getAllProjects = async () => {
    try {
      const { results, error } =
        await getAllDocumentsFromCollection<Project>("projects");
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
      return { ...result, id: projectId };
    } catch (error) {
      console.error("Erreur lors de la récupération du projet:", error);
      throw error;
    }
  };

  const projectsQuery = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  const useProjectQuery = (projectId: string) =>
    useQuery({
      queryKey: ["project", projectId],
      queryFn: () => getProject(projectId),
      enabled: !!projectId,
    });

  const createProjectMutation = useMutation({
    mutationFn: (createProjectParams: any) => {
      return createProject({
        ...createProjectParams,
        userPublicKey: publicKey,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const updateProjectMutation = useMutation({
    mutationFn: (updateProjectParams: UpdateProjectParams) => {
      return updateProject({
        ...updateProjectParams,
        userPublicKey: publicKey,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const approveProjectMutation = useMutation({
    mutationFn: (project: Project) => {
      if (!publicKey) {
        throw new Error("Public key is required to perform the action");
      }
      return approveProject({ project, userPublicKey: publicKey });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const startNftMintRoundProjectMutation = useMutation({
    mutationFn: (startNftMintRoundParams: StartNftMintRoundProjectParams) => {
      const { project, nftMaxSupply, nftUsdcPrice, nftCollectionName } =
        startNftMintRoundParams;
      if (!publicKey) {
        throw new Error("Public key is required to perform the action");
      }
      return startNftMintRound({
        project,
        nftMaxSupply,
        nftUsdcPrice,
        nftCollectionName,
        authority: publicKey,
        payer: publicKey,
        program: befundrProgram,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const startIncubationMutation = useMutation({
    mutationFn: (startNftMintRoundParams: StartIncubationProjectParams) => {
      const { project } = startNftMintRoundParams;
      if (!publicKey) {
        throw new Error("Public key is required to perform the action");
      }
      return startIncubation({
        project,
        authority: publicKey,
        payer: publicKey,
        program: befundrProgram,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const mintNftMutation = useMutation({
    mutationFn: (mintNftParams: any) => {
      const { project, quantity } = mintNftParams;
      if (!publicKey) {
        throw new Error("Public key is required to approve the project");
      }
      return mintNft({
        project,
        quantity,
        authority: publicKey,
        payer: publicKey,
        sendTransaction: sendTransaction,
        connection,
        program: befundrProgram,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  return {
    useGetProjectById,
    createProject: createProjectMutation.mutateAsync,
    updateProject: updateProjectMutation.mutateAsync,
    isUpdatingProject: updateProjectMutation.isPending,
    approveProject: approveProjectMutation.mutateAsync,
    startNftMintRound: startNftMintRoundProjectMutation.mutateAsync,
    startIncubation: startIncubationMutation.mutateAsync,
    mintNft: mintNftMutation.mutateAsync,
    isCreating: createProjectMutation.isPending,
    error: createProjectMutation.error,
    projects: projectsQuery.data,
    isLoadingProjects: projectsQuery.isLoading,
    projectsError: projectsQuery.error,
    getProject: useProjectQuery,
  };
};
