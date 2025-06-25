"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useProject } from "@/features/projects/hooks/useProject";
import { useWallet } from "@solana/wallet-adapter-react";
import Application1 from "@/components/_apply/Application1";
import Application2 from "@/components/_apply/Application2";
import Application3 from "@/components/_apply/Application3";

import Loader from "@/components/displayElements/Loader";
import BackButton from "@/components/buttons/BackButton";
import ButtonLabel from "@/components/buttons/_ButtonLabel";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";
import toast from "react-hot-toast";
import { useGetUser } from "@/features/users/hooks/useUser";
import { Project, ProjectToCreate } from "@/features/projects/types";

export default function EditProjectPage() {
  //* GLOBAL STATE
  const params = useParams();
  const router = useRouter();
  const { publicKey } = useWallet();
  const projectId = params.projectId as string;
  const { getProject, updateProject, isUpdatingProject } = useProject();
  const { data: projectData, isLoading: isProjectLoading } =
    getProject(projectId);
  const { data: user, isLoading: isUserLoading } = useGetUser(
    projectData?.data.userId ?? ""
  );

  //* LOCAL STATE
  const [currentStep, setCurrentStep] = useState(1);
  const [project, setProject] = useState<Project | null>(null);
  const [mainImageFile, setMainImageFile] = useState<File | undefined>(
    undefined
  );
  const [logoFile, setLogoFile] = useState<File | undefined>(undefined);
  const [imagesFiles, setImagesFiles] = useState<(File | string)[]>([]);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = 3;
  //TODO clean this file
  useEffect(() => {
    if (projectData) {
      setProject({
        name: projectData.data.name,
        category: projectData.data.category,
        mainImage: projectData.data.mainImage,
        logo: projectData.data.logo,
        images: projectData.data.images || [],
        headLine: projectData.data.headLine,
        description: projectData.data.description,
        pitchLink: projectData.data.pitchLink,
        videoLink: projectData.data.videoLink,
        otherLink: projectData.data.otherLink,
        website: projectData.data.website,
        twitter: projectData.data.twitter,
        discord: projectData.data.discord,
        telegram: projectData.data.telegram,
        userId: projectData.data.userId,
        owner: projectData.data.owner,
        status: projectData.data.status,
        id: projectData.id,
        likesCount: projectData.data.likesCount,
      });
    }
  }, [projectData]);

  const dataToUpdate: Partial<Project> = {};

  if (project && projectData) {
    const fieldsToCheck = [
      "name",
      "category",
      "headLine",
      "description",
      "pitchLink",
      "videoLink",
      "otherLink",
      "website",
      "twitter",
      "discord",
      "telegram",
    ] as const;

    fieldsToCheck.forEach((field) => {
      if (project[field] !== projectData.data[field]) {
        dataToUpdate[field] = project[field];
      }
    });
  }

  const handleLocalProjectUpdate = (
    updatedProject: ProjectToCreate | Project
  ) => {
    if (project) {
      setProject({ ...project, ...updatedProject } as any);
    }
  };

  const handleProjectUpdate = async () => {
    if (!project || !publicKey) return;

    try {
      await updateProject({
        project: project,
        dataToUpdate: dataToUpdate,
        mainImageFile: mainImageFile,
        logoFile: logoFile,
        imagesFiles: imagesFiles,
        userPublicKey: publicKey,
      });

      toast.success("Project updated successfully");
      router.push(`/project/${projectId}`);
    } catch (error) {
      toast.error("Error updating project");
      console.error("Error updating project:", error);
    }
  };

  if (isProjectLoading || isUserLoading || !project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  if (!publicKey || publicKey.toString() !== projectData?.data.userId) {
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
      <BackButton link={`/project/${projectId}`} />
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
          setProject={handleLocalProjectUpdate}
          setMainImageFile={setMainImageFile}
          setLogoFile={setLogoFile}
          setImagesFiles={setImagesFiles}
        />
      )}

      {currentStep === 2 && (
        <Application2 project={project} setProject={handleLocalProjectUpdate} />
      )}

      {currentStep === 3 && user && (
        <Application3 project={project} user={user} />
      )}
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
          <button
            type="button"
            onClick={handleProjectUpdate}
            disabled={isUpdatingProject}
          >
            <ButtonLabelAsync label="Update" isLoading={isUpdatingProject} />
          </button>
        )}
      </div>
    </div>
  );
}
