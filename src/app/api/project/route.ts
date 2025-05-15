import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { uploadImageServer } from "@/utils/firebaseFunctions";

export async function POST(request: NextRequest) {
  try {
    const { project, mainImageBase64, logoBase64 } =
      await request.json();

    let mainImageUrl = project.mainImage || "";
    let logoUrl = project.logo || "";

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

    const projectId = admin.firestore().collection("projects").doc().id;

    await admin.firestore().collection("projects").doc(projectId).set({
      ...project,
      mainImage: mainImageUrl,
      logo: logoUrl,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      owner: project.userId,
      id: projectId
    });
    console.log("Project created")

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
    const { project, dataToUpdate } = await request.json();
    const userRef = admin.firestore().collection("projects").doc(project.id);
    await userRef.update({ ...project, ...dataToUpdate });

    return NextResponse.json({ projectId: project.id });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
};
