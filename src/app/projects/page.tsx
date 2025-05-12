"use client";

import { useState } from "react";
import { useProject } from "@/hooks/dbData/useProject";
import ProjectCard from "@/components/cards/ProjectCard";
import Loader from "@/components/displayElements/Loader";

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
      <h1 className="text-4xl font-bold text-white mb-6">
        Discover and fund projects
      </h1>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProjects.map((project: any, idx: number) => (
            <ProjectCard key={project.id || idx} project={project.data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
