import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import CommunityLogo from "../displayElements/CommunityLogo";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="relative bg-black rounded-3xl border hover:border-custom-gray-400 border-custom-gray-800 shadow-lg overflow-hidden max-w-md w-full h-[500px] transition-all duration-300">
      {/* Dashboard image */}
      <div className="w-full h-48 relative">
        <Image
          src={project.mainImage}
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
      <div className="pt-10 pb-6 px-6 flex flex-col  gap-2">
        <div className="flex justify-between items-center gap-2 mb-1">
          <h2 className="text-2xl font-bold text-white">{project.name}</h2>
          <span className="ml-2 px-3 py-1 rounded-full border border-[#3a4a5a] text-[#b6f7f7] text-sm flex items-center gap-1">
            {project.status}
          </span>
        </div>
        <p className="bodyStyle text-[#b6f7f7] mb-2">{project.headLine}</p>

        {/* Supported by */}
        <div className="flex items-center gap-2 mb-2">
          {project.supportedBy && (
            <div className="flex justify-start items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-green-400" />
              <span className="text-body-text text-base">Supported by</span>
              <div className="w-10 h-10 relative">
                <CommunityLogo community={project.supportedBy} />
              </div>
            </div>
          )}
        </div>
        {/* See project link */}
        <p className="text-accent underline font-semibold text-base mb-2 w-fit">
          See project →
        </p>
        {/* Tags */}
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="bg-custom-gray-800 text-body-text px-3 py-1 rounded-full text-sm font-medium">
            {project.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
