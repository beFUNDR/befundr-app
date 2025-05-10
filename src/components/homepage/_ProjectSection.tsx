import { projects } from "@/data/localData";
import ProjectCard from "../cards/ProjectCard";
import "@/app/customStyles.css";
import ButtonLabel from "../buttons/_ButtonLabel";
import Link from "next/link";
import { AnimatedBlock } from "../displayElements/AnimatedBlock";

const ProjectSection = () => {
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
            {projects.slice(0, 6).map((project, index) => (
              <div key={index} className="min-w-[340px] max-w-xs flex-shrink-0">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
          <Link href="/projects" className="text-body-text w-48">
            <ButtonLabel label="Explore projects" />
          </Link>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProjectSection;
