import Image from "next/image";
import { Clock, Users, DollarSign, BadgeCheck } from "lucide-react";
import CommunityLogo from "../displayElements/CommunityLogo";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="relative bg-black rounded-3xl border border-custom-gray-800 shadow-lg overflow-hidden max-w-md w-full">
      {/* Dashboard image */}
      <div className="w-full h-48 relative">
        <Image
          src={project.image}
          alt={project.name + " dashboard"}
          fill
          className="object-cover rounded-t-3xl"
        />
        <div className="absolute -bottom-8 left-2 w-16 h-16 rounded-full bg-black border border-custom-gray-800 flex items-center justify-center shadow-lg">
          <Image
            src={project.logo}
            alt={project.name + " logo"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </div>
      </div>
      {/* Logo */}
      {/* Card content */}
      <div className="pt-10 pb-6 px-6 flex flex-col gap-2">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-white">{project.name}</h2>
          <span className="ml-2 px-3 py-1 rounded-full border border-[#3a4a5a] text-[#b6f7f7] text-sm flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-body-text" />{" "}
            {project.fundingStatus}
          </span>
        </div>
        <p className="bodyStyle text-[#b6f7f7] mb-2">{project.description}</p>
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 h-2 rounded-full bg-custom-gray-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-pink-400 transition-all"
              style={{ width: `${project.fundingPercent || 0}%` }}
            ></div>
          </div>
          <span className="text-[#b6f7f7] text-sm font-semibold">
            {project.fundingPercent}% funded
          </span>
        </div>
        {/* Infos */}
        <div className="flex items-center gap-6 mb-2">
          <span className="flex items-center gap-2 text-body-text">
            <Clock className="w-5 h-5 text-secondary" />
            {project.daysLeft} days left
          </span>
          <span className="flex items-center gap-2 text-body-text">
            <Users className="w-5 h-5 text-secondary" />
            {project.backers} backers
          </span>
        </div>
        {/* Supported by */}
        <div className="flex items-center gap-2 mb-2">
          <BadgeCheck className="w-5 h-5 text-green-400" />
          <span className="text-body-text text-base">Supported by</span>
          {project.supportedBy && (
            <div className="w-10 h-10 relative">
              <CommunityLogo community={project.supportedBy} />
            </div>
          )}
        </div>
        {/* See project link */}
        <a
          href="#"
          className="text-accent underline font-semibold text-base mb-2 w-fit"
        >
          See project →
        </a>
        {/* Tags */}
        <div className="flex gap-2 mt-2 flex-wrap">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="bg-custom-gray-800 text-body-text px-3 py-1 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
