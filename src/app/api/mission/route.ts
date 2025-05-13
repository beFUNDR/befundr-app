import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const mission = await request.json();

    // Création de la mission dans Firestore
    const docRef = await admin
      .firestore()
      .collection("missions")
      .add({
        ...mission,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: "open", // Par défaut, une mission est ouverte
      });

    return NextResponse.json({ missionId: docRef.id });
  } catch (error) {
    console.error("Error creating mission:", error);
    return NextResponse.json(
      { error: "Failed to create mission" },
      { status: 500 }
    );
  }
}
