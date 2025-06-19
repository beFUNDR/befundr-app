import { UpdateProjectParams } from "@/features/projects/types";
import { ProjectStatus } from "@/features/projects/constants/project-status";

export const approveProject = async ({
  project,
}: UpdateProjectParams): Promise<any> => {
  const response = await fetch("/api/project", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project: {
        ...project,
      },
      dataToUpdate: {
        status: ProjectStatus.Published,
      },
    }),
  });

  if (!response.ok) {
    throw new Error("Error while updating the project status");
  }

  return {};
};
