import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const mission = await request.json();

    // Create the mission in Firestore
    const docRef = await admin
      .firestore()
      .collection("missions")
      .add({
        ...mission,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        status: "open",
        applicants: [],
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

export async function PATCH(request: NextRequest) {
  try {
    const { missionId, projectId, title, description, skill, isPaid } =
      await request.json();

    //TODO: check if the user is the owner of the mission

    await admin.firestore().collection("missions").doc(missionId).update({
      title,
      description,
      skill,
      isPaid,
      edited: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ message: "Mission updated successfully" });
  } catch (error) {
    console.error("Error updating mission:", error);
    return NextResponse.json(
      { error: "Failed to update mission" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const mission = await request.json();
    const { missionId } = mission;

    //TODO: check if the user is the owner of the mission

    await admin.firestore().collection("missions").doc(missionId).delete();

    return NextResponse.json({ message: "Mission deleted successfully" });
  } catch (error) {
    console.error("Error deleting mission:", error);
    return NextResponse.json(
      { error: "Failed to delete mission" },
      { status: 500 }
    );
  }
}
