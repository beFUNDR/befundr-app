"use client";

import { useMemo, useState } from "react";
import Loader from "@/components/displayElements/Loader";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReviewPhase from "@/components/_projectPage/ReviewPhase";
import { useUser } from "@/hooks/dbData/useUser";
import CategoryTagBig from "@/components/tags/CategoryTagBig";
import Tabs from "@/components/_projectPage/Tabs";
import AboutContent from "@/components/_projectPage/AboutContent";
import UpdateContent from "@/components/_projectPage/UpdateContent";
import MissionContent from "@/components/_projectPage/MissionContent";
import VoteContent from "@/components/_projectPage/VoteContent";
import FaqContent from "@/components/_projectPage/FaqContent";
import BackButton from "@/components/buttons/BackButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { useProject } from "@/hooks/dbData/project/useProject";
import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";
import AdminModal from "@/components/modals/AdminModal";
import { ProjectStatus } from "@/data/ProjectStatus";

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { publicKey } = useWallet();
  const params = useParams();
  const projectId = params.projectId as string;
  const { getProject } = useProject();
  const { data: project, isLoading, error } = getProject(projectId);
  const { data: owner, isLoading: isOwnerLoading } = useUser(
    project?.userId ?? ""
  );
  const [isShowManageModal, setIsShowManageModal] = useState(false);

  const isOwner = useMemo(() => {
    return publicKey?.toString() === project?.userId;
  }, [project, publicKey]);

  const isAdmin = useMemo(() => {
    return (
      publicKey?.toString() === process.env.NEXT_PUBLIC_ADMIN_1 ||
      publicKey?.toString() === process.env.NEXT_PUBLIC_ADMIN_2
    );
  }, [publicKey]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  if (error) return <div>Erreur: {error.message}</div>;
  if (!project) return <div>Projet non trouvé</div>;
  if (isOwnerLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  const renderTabContent = () => {
    switch (activeTab) {
      case "about":
        return (
          <AboutContent
            description={project.description}
            owner={owner}
            isOwner={isOwner}
          />
        );
      case "updates":
        return <UpdateContent isOwner={isOwner} />;
      case "missionHub":
        return <MissionContent isOwner={isOwner} projectId={projectId} />;
      case "faq":
        return <FaqContent />;
      case "vote":
        return <VoteContent isOwner={isOwner} />;
      default:
        return (
          <AboutContent
            description={project.description}
            owner={owner}
            isOwner={isOwner}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <BackButton />
      {/* Header */}
      <div className="flex gap-2 items-center mb-2">
        <h1 className="text-4xl font-bold text-white">{project.name}</h1>
        {/* Tags */}
        <CategoryTagBig category={project.category} />
        {/* Ajouter d'autres tags si besoin */}
        <div className="flex-grow" />
        {isAdmin && (
          <button onClick={() => setIsShowManageModal(true)}>
            <ButtonLabelSecondary label="Manage" />
          </button>
        )}
      </div>
      <p className="text-lg text-gray-300 mb-6">
        {project.headLine || project.description}
      </p>

      {/* Main block */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Dashboard image */}
        <div className="flex-1 flex items-center justify-center min-w-[350px] aspect-square">
          {project.mainImage && (
            <Image
              src={project.mainImage}
              alt="Dashboard preview"
              width={500}
              height={350}
              className="rounded-2xl border border-custom-gray-600 object-cover aspect-square"
            />
          )}
        </div>
        {/* Project info */}
        {project.status === ProjectStatus.WaitingForApproval && (
          <ReviewPhase project={project} owner={owner} />
        )}
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {renderTabContent()}

      {isShowManageModal && (
        <AdminModal
          project={project}
          onClose={() => setIsShowManageModal(false)}
        />
      )}
    </div>
  );
};

export default ProjectPage;
