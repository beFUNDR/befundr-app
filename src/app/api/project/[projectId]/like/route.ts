import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebase-admin";
import { verifyFirebaseAuth } from "@/shared/api/verify-firebase-auth";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ projectId: string }> }
) {
  try {
    const uid = await verifyFirebaseAuth(request);

    const { projectId } = await context.params;

    const projectRef = admin.firestore().collection("projects").doc(projectId);
    const projectDoc = await projectRef.get();

    if (!projectDoc.exists) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const project = projectDoc.data();
    const likesCount = project?.likesCount || [];

    // If the user has already liked, remove the like, otherwise add it
    const newLikesCount = likesCount.includes(uid)
      ? likesCount.filter((id: string) => id !== uid)
      : [...likesCount, uid];

    await projectRef.update({
      likesCount: newLikesCount,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error liking project:", error);
    return NextResponse.json(
      { error: "Failed to like project" },
      { status: 500 }
    );
  }
}
