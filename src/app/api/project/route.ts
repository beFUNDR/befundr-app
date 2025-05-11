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

    // Création du projet dans Firestore
    const docRef = await admin
      .firestore()
      .collection("projects")
      .add({
        ...project,
        mainImage: mainImageUrl,
        logo: logoUrl,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        owner: publicKey,
      });

    return NextResponse.json({ projectId: docRef.id });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
