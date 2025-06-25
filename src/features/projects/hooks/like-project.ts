import { fetcher } from "@/shared/api/fetcher";

export const likeProject = async (projectId: string) => {
  const response = await fetcher(`/api/project/${projectId}/like`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    bodyParams: {},
  });

  return response;
};
