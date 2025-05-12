"use client";

import { useProjectsByUserId } from "@/hooks/dbData/useProject";
import Link from "next/link";
import ProjectCard from "../cards/ProjectCard";
import LoaderSmall from "../displayElements/LoaderSmall";

const mockProjects = [
  {
    name: "beFUNDR",
    description: "The decentralized incubator.",
    image: "/images/projects/befundr_image.png",
  },
  {
    name: "SolanaTools",
    description: "A dashboard for Solana analytics.",
    image: "/images/projects/befundr_image.png",
  },
];

const UserProjectsContent = ({ userId }: { userId: string }) => {
  const { data: projects, isLoading, error } = useProjectsByUserId(userId);

  if (isLoading) return <LoaderSmall />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
      {projects?.map((project, idx) => (
        <Link href={`/projects/${project.id}`} key={idx}>
          <ProjectCard project={project.data} />
        </Link>
      ))}
    </div>
  );
};

export default UserProjectsContent;
