"use client";

import { useState } from "react";
import ProjectCard from "@/components/cards/ProjectCard";
import Loader from "@/components/displayElements/Loader";
import Link from "next/link";
import { useProject } from "@/hooks/dbData/project/useProject";
import ApplyButton from "@/components/buttons/ApplyButton";

const ProjectsPage = () => {
  const { projects, isLoadingProjects, projectsError } = useProject();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Get all unique categories
  const categories = projects
    ? Array.from(new Set(projects.map((p: any) => p.data.category)))
    : [];

  // Filter projects by selected category
  const filteredProjects = projects
    ? projects.filter((p: any) =>
        selectedCategory ? p.data.category === selectedCategory : true
      )
    : [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 ">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-0">
        <h1 className="h1Style my-6">Discover and fund projects</h1>
        <div className="w-full md:w-auto">
          <ApplyButton />
        </div>
      </div>
      <p className="bodyStyle max-w-xl mb-10">
        Discover hand-picked projects from the best builders from the OG Solana
        community.
      </p>
      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
        <button
          className={`min-w-20 py-2 rounded-full border text-sm font-semibold transition ${
            !selectedCategory
              ? "text-accent border-accent"
              : " text-custom-gray-400 border-custom-gray-400 hover:text-custom-gray-200 hover:border-custom-gray-200 "
          }`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`min-w-26 py-2 rounded-full border text-sm font-semibold transition ${
              selectedCategory === cat
                ? "text-accent border-accent"
                : " text-custom-gray-400 border-custom-gray-400 hover:text-custom-gray-200 hover:border-custom-gray-200 "
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
        {categories.map((cat) => (
          <button
            key={cat}
            className={`min-w-26 py-2 rounded-full border text-sm font-semibold transition ${
              selectedCategory === cat
                ? "text-accent border-accent"
                : " text-custom-gray-400 border-custom-gray-400 hover:text-custom-gray-200 hover:border-custom-gray-200 "
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      {/* Grille de projets */}
      {isLoadingProjects ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : projectsError ? (
        <div className="text-red-500">Error loading projects</div>
      ) : (
        <div
          className="grid gap-8  w-full justify-center "
          style={{
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(300px, 100%), 300px))",
          }} // handle automatic number of column in responsive
        >
          {filteredProjects.map((project: any, idx: number) => (
            <Link
              key={idx}
              href={`/project/${project.id}`}
              className="min-w-[300px] max-w-xs flex-shrink-0"
            >
              <ProjectCard project={project.data} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
