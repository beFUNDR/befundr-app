import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fileToBase64,
  getAllDocumentsFromCollection,
  getDocument,
} from "@/utils/firebaseClient";
import { useWallet } from "@solana/wallet-adapter-react";
import { BEFUNDR_PROGRAM_ID, getBefundrProgram } from "../../../anchor/src";
import { useAnchorProvider } from "@/providers/SolanaProvider";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { confirmTransaction } from "@/utils/solanaUtils";

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
  }: CreateProjectParams): Promise<any> => {
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
    if (process.env.SKIP_SOLANA) {
      return {}
    }

    const [configPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("globals")],
      BEFUNDR_PROGRAM_ID
    );

    let config;
    try {
      config = await befundrProgram.account.globals.fetch(configPda);
      console.log("CONFIG = ", config)
      console.log("Created project counter = ", config.createdProjectCounter.toString())
    } catch (error) {
      console.log("CONFIG NOT EXISTING, CREATING...")

      //Admin not initialized yet, then we create it with the current user for test purposes
      const tx = await befundrProgram.methods
        .updateAdmin([publicKey])
        .accountsPartial({
          config: configPda,
          payer: publicKey,
          authority: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc({ skipPreflight: true });
      console.log("TX create admin= ", tx);

      await confirmTransaction(befundrProgram, tx);
      config = await befundrProgram.account.globals.fetch(configPda);
    }


    const [projectPda] = PublicKey.findProgramAddressSync(
      [Buffer.from("project"), config.createdProjectCounter.toArrayLike(Buffer, 'le', 8)],
      befundrProgram.programId
    );

    const createProjectTx = await befundrProgram.methods
      .createProject("")
      .accountsPartial({
        globals: configPda,
        project: projectPda,
        payer: publicKey,
        authority: publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([])
      .rpc({ skipPreflight: true });
    await confirmTransaction(befundrProgram, createProjectTx);

    console.log("Project created !!!!", await befundrProgram.account.project.fetch(projectPda));

    return {};
  };

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

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
