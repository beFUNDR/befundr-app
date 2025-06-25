import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebase-admin";
import { uploadImageServer } from "@/shared/utils/firebase-functions";
import { verifyFirebaseAuth } from "@/shared/api/verify-firebase-auth";
import { checkUserIdAuthorization } from "@/shared/api/auth";
import { hasOngoingProject } from "@/features/projects/services/project-service.server";

/**
 * Create a new project
 * @param request - The request object
 * @returns The project ID
 */
export async function POST(request: NextRequest) {
  try {
    const uid = await verifyFirebaseAuth(request);

    const { project, mainImageBase64, logoBase64, additionalImagesBase64 } =
      await request.json();

    checkUserIdAuthorization(uid, project.userId);

    if (await hasOngoingProject(project.userId)) {
      return NextResponse.json(
        { error: "User already has a project" },
        { status: 409 }
      );
    }
    let mainImageUrl = project.mainImage || "";
    let logoUrl = project.logo || "";
    let additionalImagesUrls: string[] = [];
    const timestamp = Date.now();

    if (mainImageBase64) {
      const image = Buffer.from(mainImageBase64, "base64");
      mainImageUrl = await uploadImageServer(
        image,
        `projects/${project.userId}/${project.name}/mainImage_v=${timestamp}.png`
      );
    }

    if (logoBase64) {
      const image = Buffer.from(logoBase64, "base64");
      logoUrl = await uploadImageServer(
        image,
        `projects/${project.userId}/${project.name}/logo_v=${timestamp}.png`
      );
    }

    if (additionalImagesBase64 && additionalImagesBase64.length > 0) {
      additionalImagesUrls = await Promise.all(
        additionalImagesBase64.map(async (base64: string, index: number) => {
          const image = Buffer.from(base64, "base64");
          return (
            (await uploadImageServer(
              image,
              `projects/${project.userId}/${project.name}/additional_${index}_v=${timestamp}.png`
            )) || ""
          );
        })
      );
    }

    const projectId = admin.firestore().collection("projects").doc().id;

    await admin
      .firestore()
      .collection("projects")
      .doc(projectId)
      .set({
        ...project,
        mainImage: mainImageUrl,
        logo: logoUrl,
        images: additionalImagesUrls,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        owner: project.userId,
        id: projectId,
        likesCount: [],
      });
    console.log("Project created");

    return NextResponse.json({ projectId });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

/**
 * Update a project
 * @param request - The request object
 * @returns The project ID
 */
export const PATCH = async (request: NextRequest) => {
  try {
    const {
      project,
      dataToUpdate,
      mainImageBase64,
      logoBase64,
      additionalImagesBase64,
      userPublicKey,
    } = await request.json();

    let mainImageUrl = project.mainImage;
    let logoUrl = project.logo;
    let additionalImagesUrls = project.images || [];
    const timestamp = Date.now();

    // Handle main image update
    if (mainImageBase64) {
      // Delete old main image
      if (project.mainImage) {
        const oldImagePath = project.mainImage.split("/projects/")[1];
        await admin
          .storage()
          .bucket()
          .file(`projects/${oldImagePath}`)
          .delete();
      }
      // Upload new main image
      const image = Buffer.from(mainImageBase64, "base64");
      mainImageUrl = await uploadImageServer(
        image,
        `projects/${project.userId}/${project.name}/mainImage_v=${timestamp}.png`
      );
    }

    // Handle logo update
    if (logoBase64) {
      // Delete old logo
      if (project.logo) {
        const oldLogoPath = project.logo.split("/projects/")[1];
        await admin.storage().bucket().file(`projects/${oldLogoPath}`).delete();
      }
      // Upload new logo
      const image = Buffer.from(logoBase64, "base64");
      logoUrl = await uploadImageServer(
        image,
        `projects/${project.userId}/${project.name}/logo_v=${timestamp}.png`
      );
    }

    // Handle additional images update
    if (additionalImagesBase64 && additionalImagesBase64.length > 0) {
      // Delete old images
      const oldImages = project.images || [];
      const newImageUrls = additionalImagesBase64.filter(
        (url: any) => typeof url === "string"
      );
      const imagesToDelete = oldImages.filter(
        (url: any) => !newImageUrls.includes(url)
      );

      if (imagesToDelete.length > 0) {
        await Promise.all(
          imagesToDelete.map(async (image: string) => {
            const oldImagePath = image.split("/projects/")[1];
            await admin
              .storage()
              .bucket()
              .file(decodeURIComponent(`projects/${oldImagePath}`))
              .delete();
          })
        );
      }

      // Upload new images
      additionalImagesUrls = await Promise.all(
        additionalImagesBase64.map(async (base64: string, index: number) => {
          const image = Buffer.from(base64, "base64");
          return await uploadImageServer(
            image,
            `projects/${project.userId}/${project.name}/additional_${index}_v=${timestamp}.png`
          );
        })
      );
    }

    const projectRef = admin.firestore().collection("projects").doc(project.id);
    await projectRef.update({
      ...dataToUpdate,
      mainImage: mainImageUrl,
      logo: logoUrl,
      images: additionalImagesUrls,
    });

    return NextResponse.json({ projectId: project.id });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
};
