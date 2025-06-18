"use client";

import { useMemo, useState } from "react";
import Loader from "@/components/displayElements/Loader";
import { useParams } from "next/navigation";
import WaitingForApprovalPhase from "@/components/_projectPage/WaitingForApprovalPhase";
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
import PublishedPhase from "@/components/_projectPage/PublishedPhase";
import NftMintRoundPhase from "@/components/_projectPage/NftMintRoundPhase";
import ImageCarousel from "@/components/displayElements/ImageCarousel";
import { useGetUser } from "@/features/users/hooks/useUser";

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { publicKey } = useWallet();
  const params = useParams();
  const projectId = params.projectId as string;
  const { getProject } = useProject();
  const { data: project, isLoading, error } = getProject(projectId);
  const {
    data: owner,
    isLoading: isOwnerLoading,
    error: ownerError,
  } = useGetUser(project?.data.userId ?? "");
  const [isShowManageModal, setIsShowManageModal] = useState(false);

  const isOwner = useMemo(() => {
    return publicKey?.toString() === project?.data.userId;
  }, [project, publicKey]);

  const isAdmin = useMemo(() => {
    return (
      publicKey?.toString() === process.env.NEXT_PUBLIC_ADMIN_1 ||
      publicKey?.toString() === process.env.NEXT_PUBLIC_ADMIN_2
    );
  }, [publicKey]);

  // Merge mainImage and potentialadditional images
  const allImages = useMemo(() => {
    if (!project) return [];
    return [project.data.mainImage, ...(project.data.images || [])].filter(
      Boolean
    );
  }, [project]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  if (error || ownerError)
    return <div>Erreur: {error?.message || ownerError?.message}</div>;
  if (!project) return <div>Projet non trouvé</div>;
  if (!owner) return <div>Propriétaire non trouvé</div>;
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
            description={project.data.description}
            owner={owner?.data}
            isOwner={isOwner}
            projectId={projectId}
          />
        );
      case "updates":
        return <UpdateContent isOwner={isOwner} projectId={projectId} />;
      case "missionHub":
        return <MissionContent isOwner={isOwner} projectId={projectId} />;
      case "faq":
        return <FaqContent />;
      case "vote":
        return <VoteContent isOwner={isOwner} />;
      default:
        return (
          <AboutContent
            description={project.data.description}
            owner={owner?.data}
            isOwner={isOwner}
            projectId={projectId}
          />
        );
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <BackButton link={"/projects"} />
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center mb-2">
        <h1 className="text-4xl font-bold text-white">{project.data.name}</h1>
        {/* Tags */}
        <CategoryTagBig category={project.data.category} />
        {/* Ajouter d'autres tags si besoin */}
        <div className="flex-grow" />
        {isAdmin && (
          <button onClick={() => setIsShowManageModal(true)}>
            <ButtonLabelSecondary label="Manage" />
          </button>
        )}
      </div>
      <p className="text-lg text-gray-300 mb-6">
        {project.data.headLine || project.data.description}
      </p>

      {/* Main block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Dashboard image */}
        <ImageCarousel images={allImages} />
        {/* Project info */}
        {project.data.status === ProjectStatus.WaitingForApproval && (
          <WaitingForApprovalPhase project={project.data} owner={owner?.data} />
        )}
        {project.data.status === ProjectStatus.Published && (
          <PublishedPhase project={project.data} owner={owner?.data} />
        )}
        {project.data.status === ProjectStatus.NftMintRound && (
          <NftMintRoundPhase project={project.data} owner={owner?.data} />
        )}
      </div>

      {/* Tabs */}
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      {renderTabContent()}

      {isShowManageModal && (
        <AdminModal
          project={project.data}
          onClose={() => setIsShowManageModal(false)}
        />
      )}
    </div>
  );
};

export default ProjectPage;
