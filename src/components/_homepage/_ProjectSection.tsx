"use client";

import "@/app/customStyles.css";
import Link from "next/link";
import ExploreProjectButton from "@/components/buttons/ExploreProjectButton";
import ProjectCard from "@/features/projects/components/ProjectCard";
import { AnimatedBlock } from "@/components/displayElements/AnimatedBlock";
import ApplyButton from "@/components/buttons/ApplyButton";
import { useGetProjects } from "@/features/projects/hooks";

const ProjectSection = () => {
  const { data: projects } = useGetProjects();

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
          <div className=" flex flex-row gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent py-2">
            {projects &&
              projects.slice(0, 6).map((project, index) => (
                <Link
                  key={index}
                  href={`/project/${project.id}`}
                  className="min-w-[200px] md:min-w-[340px] max-w-xs flex-shrink-0 "
                >
                  <ProjectCard project={project} />
                </Link>
              ))}
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex w-full md:w-48">
              <ExploreProjectButton />
            </div>
            <ApplyButton />
          </div>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProjectSection;
