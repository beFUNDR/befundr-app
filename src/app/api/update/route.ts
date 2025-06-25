import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const { update } = await request.json();
    // Create the update in Firestore
    const docRef = await admin
      .firestore()
      .collection("updates")
      .add({
        ...update,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        likesCount: [],
      });

    return NextResponse.json({ updateId: docRef.id });
  } catch (error) {
    console.error("Error creating update:", error);
    return NextResponse.json(
      { error: "Failed to create update" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { updateId, projectId, title, message } = await request.json();

    //TODO: check if the user is the owner of the update

    await admin.firestore().collection("updates").doc(updateId).update({
      title,
      message,
      edited: admin.firestore.FieldValue.serverTimestamp(),
    });

    return NextResponse.json({ message: "Update updated successfully" });
  } catch (error) {
    console.error("Error creating update:", error);
    return NextResponse.json(
      { error: "Failed to create update" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const update = await request.json();
    const { updateId } = update;

    //TODO: check if the user is the owner of the update

    await admin.firestore().collection("updates").doc(updateId).delete();

    return NextResponse.json({ message: "Update deleted successfully" });
  } catch (error) {
    console.error("Error deleting update:", error);
    return NextResponse.json(
      { error: "Failed to delete update" },
      { status: 500 }
    );
  }
}
