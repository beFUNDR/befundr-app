import { UpdateProjectParams } from "@/features/projects/types";
import { fileToBase64 } from "@/shared/utils/firebaseClient";

export const updateProject = async ({
  project,
  dataToUpdate,
  mainImageFile,
  logoFile,
  imagesFiles,
  userPublicKey,
}: UpdateProjectParams): Promise<any> => {
  if (!userPublicKey) {
    throw new Error("Connect your wallet");
  }
  let mainImageBase64 = "";
  let logoBase64 = "";
  let additionalImagesBase64: string[] = [];
  if (mainImageFile) {
    mainImageBase64 = await fileToBase64(mainImageFile);
  }
  if (logoFile) {
    logoBase64 = await fileToBase64(logoFile);
  }
  if (imagesFiles) {
    additionalImagesBase64 = await Promise.all(
      imagesFiles.map(async (file) => {
        if (file instanceof File) {
          return await fileToBase64(file);
        }
        return file;
      })
    );
  }

  console.log("mainImageBase64", mainImageBase64);
  console.log("logoBase64", logoBase64);
  console.log("additionalImagesBase64", additionalImagesBase64);
  const response = await fetch("/api/project", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      project: {
        ...project,
      },
      dataToUpdate: { ...dataToUpdate },
      mainImageBase64: mainImageBase64,
      logoBase64: logoBase64,
      additionalImagesBase64: additionalImagesBase64,
      userPublicKey: userPublicKey,
    }),
  });

  if (!response.ok) {
    throw new Error("Error while updating the project status");
  }

  return {};
};
