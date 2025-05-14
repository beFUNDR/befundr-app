import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";
import { uploadImageServer } from "@/utils/firebaseFunctions";

export async function POST(request: NextRequest) {
  try {
    const { project, publicKey, mainImageBase64, logoBase64 } =
      await request.json();

    let mainImageUrl = project.mainImage || "";
    let logoUrl = project.logo || "";

    if (mainImageBase64) {
      const image = Buffer.from(mainImageBase64, "base64");
      mainImageUrl =
        (await uploadImageServer(
          image,
          `projects/${publicKey}/${project.name}/mainImage.png`
        )) || "";
    }

    if (logoBase64) {
      const image = Buffer.from(logoBase64, "base64");
      logoUrl =
        (await uploadImageServer(
          image,
          `projects/${publicKey}/${project.name}/logo.png`
        )) || "";
    }

    return NextResponse.json({});
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
    const { project } = await request.json();

    const userRef = admin.firestore().collection("projects").doc(project.projectPda);
    await userRef.update({ ...project });

    return NextResponse.json({ projectId: project.projectPda });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
};
