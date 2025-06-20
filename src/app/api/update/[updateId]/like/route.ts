import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebase-admin";
import { verifyFirebaseAuth } from "@/shared/api/verify-firebase-auth";

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ updateId: string }> }
) {
  try {
    const uid = await verifyFirebaseAuth(request);

    const { updateId } = await context.params;

    const updateRef = admin.firestore().collection("updates").doc(updateId);
    const updateDoc = await updateRef.get();

    if (!updateDoc.exists) {
      return NextResponse.json({ error: "Update not found" }, { status: 404 });
    }

    const update = updateDoc.data();
    const likesCount = update?.likesCount || [];

    // If the user has already liked, remove the like, otherwise add it
    const newLikesCount = likesCount.includes(uid)
      ? likesCount.filter((id: string) => id !== uid)
      : [...likesCount, uid];

    await updateRef.update({
      likesCount: newLikesCount,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error liking update:", error);
    return NextResponse.json(
      { error: "Failed to like update" },
      { status: 500 }
    );
  }
}
