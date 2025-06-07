import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { uploadImageServer } from "@/utils/firebaseFunctions";

export async function POST(request: NextRequest) {
  try {
    const { project, mainImageBase64, logoBase64, additionalImagesBase64 } =
      await request.json();

    let mainImageUrl = project.mainImage || "";
    let logoUrl = project.logo || "";
    let additionalImagesUrls: string[] = [];

    if (mainImageBase64) {
      const image = Buffer.from(mainImageBase64, "base64");
      mainImageUrl =
        (await uploadImageServer(
          image,
          `projects/${project.userId}/${project.name}/mainImage.png`
        )) || "";
    }

    if (logoBase64) {
      const image = Buffer.from(logoBase64, "base64");
      logoUrl =
        (await uploadImageServer(
          image,
          `projects/${project.userId}/${project.name}/logo.png`
        )) || "";
    }

    if (additionalImagesBase64 && additionalImagesBase64.length > 0) {
      additionalImagesUrls = await Promise.all(
        additionalImagesBase64.map(async (base64: string, index: number) => {
          const image = Buffer.from(base64, "base64");
          return (
            (await uploadImageServer(
              image,
              `projects/${project.userId}/${project.name}/additional_${index}.png`
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
    // let additionalImagesUrls = project.images || [];

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
        `projects/${project.userId}/${project.name}/mainImage.png`
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
        `projects/${project.userId}/${project.name}/logo.png`
      );
    }

    // Gestion des images additionnelles
    // if (additionalImagesBase64 && additionalImagesBase64.length > 0) {
    //   // Supprimer les anciennes images qui ne sont plus présentes
    //   const oldImages = project.images || [];
    //   const newImageUrls = additionalImagesBase64.filter(
    //     (url) => typeof url === "string"
    //   );
    //   const imagesToDelete = oldImages.filter(
    //     (url) => !newImageUrls.includes(url)
    //   );

    //   await Promise.all(
    //     imagesToDelete.map(async (url) => {
    //       const imagePath = url.split("/o/")[1].split("?")[0];
    //       await admin
    //         .storage()
    //         .bucket()
    //         .file(decodeURIComponent(imagePath))
    //         .delete();
    //     })
    //   );

    //   // Upload des nouvelles images
    //   additionalImagesUrls = await Promise.all(
    //     additionalImagesBase64.map(async (base64: string, index: number) => {
    //       if (typeof base64 === "string") return base64;
    //       const image = Buffer.from(base64, "base64");
    //       return await uploadImageServer(
    //         image,
    //         `projects/${project.userId}/${project.name}/additional_${index}.png`
    //       );
    //     })
    //   );
    // }

    const projectRef = admin.firestore().collection("projects").doc(project.id);
    await projectRef.update({
      ...dataToUpdate,
      mainImage: mainImageUrl,
      logo: logoUrl,
      // images: additionalImagesUrls,
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
