"use client";

import Loader from "@/components/displayElements/Loader";
import { useProject } from "@/hooks/dbData/useProject";
import { useParams } from "next/navigation";
import CategoryTag from "@/components/displayElements/CategoryTag";
import XButton from "@/components/buttons/XButton";
import DiscordButton from "@/components/buttons/DiscordButton";
import TelegramButton from "@/components/buttons/TelegramButton";
import InternetButton from "@/components/buttons/InternetButton";
import Image from "next/image";

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

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  if (error) return <div>Erreur: {error.message}</div>;
  if (!project) return <div>Projet non trouvé</div>;

  // Données fictives pour la démo UI
  const percentFunded = 51;
  const amountRaised = 102390;
  const goal = 200000;
  const daysLeft = 25;
  const contributions = 2654;
  const owner = { name: "Jess", avatar: project.logo };
  const supportedBy = "Monke"; // ou project.supportedBy

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white mb-2">{project.name}</h1>
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
              className="rounded-2xl border border-gray-700"
            />
          )}
        </div>
        {/* Project info */}
        <div className="flex-1 flex flex-col gap-4 bg-black/40 rounded-2xl p-8 border border-gray-700 min-w-[350px]">
          {/* Progress bar */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-accent font-bold">
                {percentFunded}% funded
              </span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${percentFunded}%` }}
              />
            </div>
          </div>
          {/* Amounts */}
          <div>
            <span className="text-3xl font-bold text-accent">
              USDC {amountRaised.toLocaleString()}
            </span>
            <span className="block text-gray-400">
              pledged of USDC {goal.toLocaleString()} goal
            </span>
          </div>
          {/* Early access */}
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-custom-gray-800 text-accent px-2 py-1 rounded-full text-xs">
              Early Access
            </span>
            {/* {supportedBy && (
              <div className="flex items-center gap-1">
                <CommunityLogo community={supportedBy} />
              </div>
            )} */}
          </div>
          {/* Owner & stats */}
          <div className="flex items-center gap-4 mb-2">
            {owner.avatar && (
              <Image
                src={owner.avatar}
                alt={owner.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <div className="font-bold text-white">{owner.name}</div>
              <div className="text-xs text-gray-400">Project owner</div>
            </div>
            <div className="ml-auto flex gap-6">
              <div className="text-center">
                <div className="font-bold text-white">{daysLeft}</div>
                <div className="text-xs text-gray-400">Days left</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-white">{contributions}</div>
                <div className="text-xs text-gray-400">Contributions</div>
              </div>
            </div>
          </div>
          {/* Fund button */}
          <button className="w-full bg-accent text-black font-bold py-3 rounded-full text-lg mb-2">
            Fund
          </button>
          {/* Socials */}
          <div className="flex gap-4 justify-center mb-2">
            {project.website && <InternetButton href={project.website} />}
            {project.twitter && <XButton href={project.twitter} />}
            {project.discord && <DiscordButton href={project.discord} />}
            {project.telegram && <TelegramButton href={project.telegram} />}
          </div>
          <div className="text-xs text-gray-400 text-center">
            All or nothing. This project will only be funded if it reached its
            goal by February 14 2025 7:30 PM CET.
          </div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mb-6">
        <CategoryTag category={project.category} />
        {/* Ajouter d'autres tags si besoin */}
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
