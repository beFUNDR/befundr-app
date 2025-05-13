"use client";

import "@/app/customStyles.css";
import { AnimatedBlock } from "../displayElements/AnimatedBlock";
import ExploreProjectButton from "../buttons/ExploreProjectButton";
import ProjectCard from "../cards/ProjectCard";
import Link from "next/link";
import { useProject } from "@/hooks/dbData/project/useProject";

const ProjectSection = () => {
  const { projects, isLoadingProjects, projectsError } = useProject();

  return (
    <AnimatedBlock className="flex flex-col w-full mt-8">
      <div className="container mx-auto flex flex-col gap-12 py-16 px-4">
        <div className="flex-1 flex flex-col justify-center gap-4">
          <h1 className="h1Style mb-4">
            Discover <strong className="text-accent">promising projects</strong>
          </h1>
          <p className="bodyStyle max-w-xl">
            Explore the latest and most promising projects from the top builders
            in the Solana ecosystem.
          </p>
          <div className="flex flex-row gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent py-2">
            {projects &&
              projects.slice(0, 6).map((project, index) => (
                <Link
                  key={index}
                  href={`/project/${project.id}`}
                  className="min-w-[340px] max-w-xs flex-shrink-0"
                >
                  <ProjectCard project={project.data} />
                </Link>
              ))}
          </div>
          <div className="w-48">
            <ExploreProjectButton />
          </div>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProjectSection;
