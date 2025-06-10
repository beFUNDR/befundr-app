"use client";
import { useState } from "react";
import Application1 from "@/components/_apply/Application1";
import ProgressBar from "@/components/_apply/ProgressBar";
import ButtonLabel from "@/components/buttons/_ButtonLabel";
import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";
import Application2 from "@/components/_apply/Application2";
import Application3 from "@/components/_apply/Application3";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/providers/SolanaProvider";
import toast from "react-hot-toast";
import ApplicationValidationModal from "@/components/modals/ApplicationValidationModal";
import { useUser } from "@/hooks/dbData/useUser";
import Loader from "@/components/displayElements/Loader";
import { useProject } from "@/hooks/dbData/project/useProject";

export default function ApplyPage() {
  const { publicKey } = useWallet();
  const { createProject, isCreating } = useProject();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [project, setProject] = useState<ProjectToCreate>({
    userId: publicKey?.toString() || "",
    name: "",
    category: "Community",
    mainImage: "",
    logo: "",
    images: [],
    headLine: "",
    description: "",
    website: "",
    twitter: "",
    discord: "",
    telegram: "",
    status: "WaitingForApproval",
  });
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [imagesFiles, setImagesFiles] = useState<(File | string)[]>([]);
  const [isApplicationValidated, setIsApplicationValidated] = useState(false);
  const { data: user, isLoading: isUserLoading } = useUser(
    publicKey?.toString() || ""
  );

  if (isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  // const isUserDataSetted = useMemo(() => {
  //   return true;
  // }, []);

  const handleApply = async () => {
    try {
      if (!publicKey) {
        throw new Error("Connect your wallet");
      }
      if (!mainImageFile) {
        throw new Error("Select a main image");
      }
      if (!logoFile) {
        throw new Error("Select a logo");
      }
      if (!project.name) {
        throw new Error("Enter a name");
      }
      if (!project.category) {
        throw new Error("Select a category");
      }
      if (!project.headLine) {
        throw new Error("Enter a headLine");
      }
      if (!project.description) {
        throw new Error("Enter a description");
      }

      await createProject({
        project,
        mainImageFile,
        logoFile,
        imagesFiles,
      });

      setIsApplicationValidated(true);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // return if no public key
  if (!publicKey) {
    return (
      <div className="max-w-3xl mx-auto py-10 flex flex-col items-center justify-center h-[500px]">
        <h1 className="h2Style mb-4 ">Apply for your project 🚀</h1>
        <p className="bodyStyle mb-4">Connect your wallet to apply</p>
        <WalletButton />
      </div>
    );
  }

  // return if no user
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="h2Style mb-4 ">Apply for your project 🚀</h1>
        <p className="bodyStyle mb-4">Connect your wallet to apply</p>
        <WalletButton />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 ">
      <h1 className="h1Style my-6 ">Apply for your project 🚀</h1>
      {!user.isCompleteProfil && (
        <p className="bodyStyle !text-red-600 mb-6">
          Your profile is not set. Please set it before applying.
        </p>
      )}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      {/* Application steps */}
      {currentStep === 1 && (
        <Application1
          project={project}
          setProject={setProject}
          setMainImageFile={setMainImageFile}
          setLogoFile={setLogoFile}
          setImagesFiles={setImagesFiles}
        />
      )}
      {currentStep === 2 && (
        <Application2 project={project} setProject={setProject} />
      )}
      {currentStep === 3 && <Application3 project={project} user={user} />}
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
          <button type="button" onClick={handleApply} disabled={isCreating}>
            <ButtonLabelAsync label="Apply" isLoading={isCreating} />
          </button>
        )}
      </div>
      {isApplicationValidated && project.logo && project.name && (
        <ApplicationValidationModal
          image={project.logo}
          projectName={project.name}
          onClose={() => setIsApplicationValidated(false)}
        />
      )}
    </div>
  );
}
