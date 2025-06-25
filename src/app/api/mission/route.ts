import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebase-admin";
import { verifyFirebaseAuth } from "@/shared/api/verify-firebase-auth";
import { checkUserIdAuthorization } from "@/shared/api/auth";
import { getProjectById } from "@/features/projects/services/project-service.server";
import { Mission } from "@/features/missions";

export async function POST(request: NextRequest) {
  try {
    const uid = await verifyFirebaseAuth(request);

    const { mission } = await request.json();
    const project = await getProjectById(mission.projectId);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    const ownerId = project.owner;

    checkUserIdAuthorization(uid, ownerId);

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

    const createdMission = await docRef.get();

    return NextResponse.json(createdMission);
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
    const { mission }: { mission: Mission } = await request.json();

    //TODO: check if the user is the owner of the mission
    await admin
      .firestore()
      .collection("missions")
      .doc(mission.id)
      .update({
        ...mission,
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
