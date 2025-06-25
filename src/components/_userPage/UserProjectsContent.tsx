"use client";

import Link from "next/link";
import { useProjectsByUserId } from "@/features/projects/hooks/useProject";
import ProjectCard from "@/components/cards/ProjectCard";
import LoaderSmall from "@/components/displayElements/LoaderSmall";

const UserProjectsContent = ({ userId }: { userId: string }) => {
  const { data: projects, isLoading, error } = useProjectsByUserId(userId);

  if (isLoading) return <LoaderSmall />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4 justify-items-center">
      {projects?.map((project, idx) => (
        <Link href={`/project/${project.id}`} key={idx}>
          <ProjectCard project={project.data} />
        </Link>
      ))}
    </div>
  );
};

export default UserProjectsContent;
