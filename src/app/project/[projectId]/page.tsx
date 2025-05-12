"use client";

import Loader from "@/components/displayElements/Loader";
import { useProject } from "@/hooks/dbData/useProject";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReviewPhase from "./ReviewPhase";
import { useUser } from "@/hooks/dbData/useUser";
import CategoryTagBig from "@/components/displayElements/CategoryTagBig";

const TABS = [
  { label: "About" },
  { label: "Updates", count: 2 },
  { label: "Contributions" },
  { label: "Perks" },
  { label: "FAQ" },
  { label: "Vote", count: 2 },
];

const ProjectPage = () => {
  const params = useParams();
  const projectId = params.projectId as string;
  const { getProject } = useProject();
  const { data: project, isLoading, error } = getProject(projectId);
  const { data: owner, isLoading: isOwnerLoading } = useUser(
    project?.userId ?? ""
  );

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex gap-2 items-center mb-2">
        <h1 className="text-4xl font-bold text-white">{project.name}</h1>
        {/* Tags */}
        <CategoryTagBig category={project.category} />
        {/* Ajouter d'autres tags si besoin */}
      </div>
      <p className="text-lg text-gray-300 mb-6">
        {project.headLine || project.description}
      </p>

      {/* Main block */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Dashboard image */}
        <div className="flex-1 flex items-center justify-center min-w-[350px]">
          {project.mainImage && (
            <Image
              src={project.mainImage}
              alt="Dashboard preview"
              width={500}
              height={350}
              className="rounded-2xl border border-custom-gray-600"
            />
          )}
        </div>
        {/* Project info */}
        {project.status === "In review" && (
          <ReviewPhase project={project} owner={owner} />
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-custom-gray-600 mb-6">
        {TABS.map((tab, idx) => (
          <div
            key={tab.label}
            className={`pb-2 px-2 text-white cursor-pointer border-b-2 ${
              idx === 0 ? "border-accent" : "border-transparent"
            }`}
          >
            {tab.label}
            {tab.count && (
              <span className="ml-1 text-xs bg-custom-gray-800 px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* About section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-white mb-2">The Story</h2>
        <p className="text-gray-300">{project.description}</p>
      </div>
      {/* Goals section */}
      <div>
        <h2 className="text-xl font-bold text-white mb-2">Goals</h2>
        <p className="text-gray-300">Create campaigns.</p>
      </div>
    </div>
  );
};

export default ProjectPage;
