"use client";

import { useState } from "react";
import { useProject } from "@/hooks/dbData/useProject";
import ProjectCard from "@/components/cards/ProjectCard";
import Loader from "@/components/displayElements/Loader";
import Link from "next/link";
import BackButton from "@/components/buttons/BackButton";

// On suppose que le type Project est global

const ProjectsPage = () => {
  const { projects, isLoadingProjects, projectsError } = useProject();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Récupérer toutes les catégories uniques
  const categories = projects
    ? Array.from(new Set(projects.map((p: any) => p.data.category)))
    : [];

  // Filtrer les projets selon la catégorie sélectionnée
  const filteredProjects = projects
    ? projects.filter((p: any) =>
        selectedCategory ? p.data.category === selectedCategory : true
      )
    : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <BackButton />
      <h1 className="h1Style mb-6">Discover and fund projects</h1>
      <p className="bodyStyle max-w-xl mb-10">
        Discover hand-picked projects from the best builders from the OG Solana
        community.
      </p>
      {/* Filtres catégories */}
      <div className="flex gap-2 mb-8 flex-wrap">
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
            className={`min-w-20 py-2 rounded-full border text-sm font-semibold transition ${
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
          className="grid gap-8  w-full justify-center"
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
