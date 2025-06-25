import { CreateProjectParams } from "@/features/projects/types";
import { fetcher } from "@/shared/api/fetcher";
import { fileToBase64 } from "@/shared/utils/firebase-client";

export const createProject = async ({
  project,
  mainImageFile,
  logoFile,
  imagesFiles,
  userPublicKey,
}: CreateProjectParams): Promise<any> => {
  if (!userPublicKey) {
    throw new Error("Connect your wallet");
  }

  const mainImageBase64 = await fileToBase64(mainImageFile);
  const logoBase64 = await fileToBase64(logoFile);

  // Convertir les images supplémentaires en base64
  const additionalImagesBase64 = imagesFiles
    ? await Promise.all(imagesFiles.map((file) => fileToBase64(file)))
    : [];

  const response = await fetcher("/api/project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    bodyParams: {
      project: { ...project, userId: userPublicKey },
      mainImageBase64,
      logoBase64,
      additionalImagesBase64,
    },
  });
  return response.projectId;
};
