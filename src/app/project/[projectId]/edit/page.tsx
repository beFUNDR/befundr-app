"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProject } from "@/hooks/dbData/project/useProject";
import { useUser } from "@/hooks/dbData/useUser";
import { useWallet } from "@solana/wallet-adapter-react";
import Application1 from "@/components/_apply/Application1";
import Application2 from "@/components/_apply/Application2";
import Application3 from "@/components/_apply/Application3";

import Loader from "@/components/displayElements/Loader";
import BackButton from "@/components/buttons/BackButton";
import ButtonLabel from "@/components/buttons/_ButtonLabel";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";

export default function EditProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [project, setProject] = useState<Project | null>(null);
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const router = useRouter();
  const { publicKey } = useWallet();
  const projectId = params.projectId as string;
  const { getProject } = useProject();
  const { data: projectData, isLoading: isProjectLoading } =
    getProject(projectId);
  const { data: user, isLoading: isUserLoading } = useUser(
    projectData?.userId ?? ""
  );

  const totalSteps = 3;

  useEffect(() => {
    if (projectData) {
      setProject({
        name: projectData.name,
        category: projectData.category,
        mainImage: projectData.mainImage,
        logo: projectData.logo,
        images: projectData.images || [],
        headLine: projectData.headLine,
        description: projectData.description,
        pitchLink: projectData.pitchLink,
        videoLink: projectData.videoLink,
        otherLink: projectData.otherLink,
        website: projectData.website,
        twitter: projectData.twitter,
        discord: projectData.discord,
        telegram: projectData.telegram,
        userId: projectData.userId,
        status: projectData.status,
        id: projectData.id,
      });
    }
  }, [projectData]);

  console.log("project", project);

  const handleProjectUpdate = (updatedProject: ProjectToCreate | Project) => {
    if (project) {
      setProject({ ...project, ...updatedProject });
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!project || !publicKey) return;

    setIsLoading(true);
    setError(null);

    // try {
    //   const updatedProject = { ...project };
    //   const imagesToDelete: string[] = [];

    //   // Gestion de l'image principale
    //   if (mainImageFile) {
    //     const mainImageUrl = await uploadImageToStorage(
    //       mainImageFile,
    //       "projects"
    //     );
    //     updatedProject.mainImage = mainImageUrl;
    //     if (projectData?.mainImage) {
    //       imagesToDelete.push(projectData.mainImage);
    //     }
    //   }

    //   // Gestion du logo
    //   if (logoFile) {
    //     const logoUrl = await uploadImageToStorage(logoFile, "projects");
    //     updatedProject.logo = logoUrl;
    //     if (projectData?.logo) {
    //       imagesToDelete.push(projectData.logo);
    //     }
    //   }

    //   // Gestion des images additionnelles
    //   if (imagesFiles.length > 0) {
    //     const newImageUrls = await Promise.all(
    //       imagesFiles.map((file) => uploadImageToStorage(file, "projects"))
    //     );
    //     updatedProject.images = newImageUrls;

    //     // Supprimer les anciennes images qui ne sont plus utilisées
    //     const oldImages = projectData?.images || [];
    //     const imagesToKeep = newImageUrls.filter((url) =>
    //       oldImages.includes(url)
    //     );
    //     const imagesToRemove = oldImages.filter(
    //       (url) => !imagesToKeep.includes(url)
    //     );
    //     imagesToDelete.push(...imagesToRemove);
    //   }

    //   // Supprimer les images non utilisées
    //   await Promise.all(
    //     imagesToDelete.map((url) => deleteImageFromStorage(url))
    //   );

    //   // Mettre à jour le projet dans Firestore
    //   await updateProject(projectId, updatedProject);

    //   router.push(`/project/${projectId}`);
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : "Une erreur est survenue");
    // } finally {
    //   setIsLoading(false);
    // }
  };

  if (isProjectLoading || isUserLoading || !project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!publicKey || publicKey.toString() !== projectData?.userId) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-white">
          You are not authorized to edit this project.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <BackButton />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Edit project</h1>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-white p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      {currentStep === 1 && (
        <Application1
          project={project}
          setProject={handleProjectUpdate}
          setMainImageFile={setMainImageFile}
          setLogoFile={setLogoFile}
          setImagesFiles={setImagesFiles}
        />
      )}

      {currentStep === 2 && (
        <Application2 project={project} setProject={handleProjectUpdate} />
      )}

      {currentStep === 3 && <Application3 project={project} user={user!} />}
      <div className="flex flex-col md:flex-row justify-start mt-4 gap-4">
        {currentStep > 1 && (
          <button
            type="button"
            onClick={() => setCurrentStep((s) => Math.max(s - 1, 1))}
          >
            <ButtonLabelSecondary label="Back" />
          </button>
        )}
        {currentStep < totalSteps && (
          <button
            type="button"
            onClick={() => {
              setCurrentStep((s) => Math.min(s + 1, totalSteps));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ButtonLabel label="Next" />
          </button>
        )}
        {currentStep === totalSteps && (
          <button type="button">
            <ButtonLabelAsync label="Update" isLoading={false} />
          </button>
        )}
      </div>
    </div>
  );
}
