import { UpdateProjectParams } from "./type";

export const updateProject = async ({
  project,
  dataToUpdate,
  userPublicKey,
}: UpdateProjectParams): Promise<any> => {
  const response = await fetch("/api/project", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project: {
        ...project,
      },
      dataToUpdate: { ...dataToUpdate },
    }),
  });

  if (!response.ok) {
    throw new Error("Error while updating the project status");
  }

  return {};
};
