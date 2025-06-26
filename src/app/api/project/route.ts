import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebase-admin";
import { uploadImageServer } from "@/shared/utils/firebase-functions";
import { verifyFirebaseAuth } from "@/shared/api/verify-firebase-auth";
import {
  getProjectById,
  hasOngoingProject,
} from "@/features/projects/services/project-service.server";
import { COLLECTIONS } from "@/lib/firebase/firebase-constants";
import { Project } from "@/features/projects/types";
import { checkUserIdAuthorization } from "@/shared/api/auth";

/**
 * Create a new project
 * @param request - The request object
 * @returns The project ID
 */
export async function POST(request: NextRequest) {
  try {
    const uid = await verifyFirebaseAuth(request);

    const { project } = await request.json();

    if (await hasOngoingProject(uid)) {
      return NextResponse.json(
        { error: "User already has a project" },
        { status: 409 }
      );
    }
    let mainImageUrl = project.mainImage || "";
    let logoUrl = project.logo || "";
    let additionalImagesUrls: string[] = [];
    const timestamp = Date.now();

    const projectId = admin
      .firestore()
      .collection(COLLECTIONS.PROJECTS)
      .doc().id;

    if (project.mainImage) {
      const image = Buffer.from(project.mainImage, "base64");
      mainImageUrl = await uploadImageServer(
        image,
        `projects/${projectId}/mainImage_v=${timestamp}.png`
      );
    }

    if (project.logo) {
      const image = Buffer.from(project.logo, "base64");
      logoUrl = await uploadImageServer(
        image,
        `projects/${projectId}/logo_v=${timestamp}.png`
      );
    }

    if (project.images && project.images.length > 0) {
      additionalImagesUrls = await Promise.all(
        project.images.map(async (base64: string, index: number) => {
          const image = Buffer.from(base64, "base64");
          return (
            (await uploadImageServer(
              image,
              `projects/${projectId}/additional_${index}_v=${timestamp}.png`
            )) || ""
          );
        })
      );
    }

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
        owner: uid,
        userId: uid,
        id: projectId,
        likesCount: [],
        status: "WaitingForApproval",
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
    const uid = await verifyFirebaseAuth(request);

    const {
      project,
      mainImage,
      logo,
      images,
    }: {
      project: Partial<Project>;
      mainImage: string;
      logo: string;
      images: string[];
    } = await request.json();
    const storedProject = await getProjectById(project.id!);

    if (!storedProject) {
      throw new Error("Project not found");
    }

    //Ensure the user is the owner of the project to update
    checkUserIdAuthorization(uid, storedProject.owner);

    let mainImageUrl = project.mainImage;
    let logoUrl = project.logo;
    let additionalImagesUrls = project.images || [];
    const timestamp = Date.now();

    // Handle main image update
    if (mainImage) {
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
      const image = Buffer.from(mainImage, "base64");
      mainImageUrl = await uploadImageServer(
        image,
        `projects/${project.id}/mainImage_v=${timestamp}.png`
      );
    }

    // Handle logo update
    if (logo) {
      // Delete old logo
      if (project.logo) {
        const oldLogoPath = project.logo.split("/projects/")[1];
        await admin.storage().bucket().file(`projects/${oldLogoPath}`).delete();
      }
      // Upload new logo
      const image = Buffer.from(logo, "base64");
      logoUrl = await uploadImageServer(
        image,
        `projects/${project.id}/logo_v=${timestamp}.png`
      );
    }

    // Handle additional images update
    if (images && images.length > 0) {
      // Delete old images
      const oldImages = project.images || [];
      const newImageUrls = images.filter((url: any) => typeof url === "string");
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
        images.map(async (base64: string, index: number) => {
          const image = Buffer.from(base64, "base64");
          return await uploadImageServer(
            image,
            `projects/${project.id}/additional_${index}_v=${timestamp}.png`
          );
        })
      );
    }

    const projectRef = admin
      .firestore()
      .collection("projects")
      .doc(project.id!);
    await projectRef.update({
      ...project,
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
