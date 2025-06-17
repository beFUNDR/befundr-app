import { NextRequest, NextResponse } from "next/server";
import admin from "@/lib/firebase/firebaseAdmin";

export async function POST(request: NextRequest) {
  try {
    const application = await request.json();

    // Create the application in Firestore
    const docRef = await admin
      .firestore()
      .collection("applications")
      .add({
        ...application,
        status: "pending",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    // Add the user to the mission's applicants array
    await admin
      .firestore()
      .collection("missions")
      .doc(application.missionId)
      .update({
        applicants: admin.firestore.FieldValue.arrayUnion(application.userId),
      });

    return NextResponse.json({ applicationId: docRef.id });
  } catch (error) {
    console.error("Error creating application:", error);
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { applicationId, status } = await request.json();

    // Get the application to get missionId and userId
    const applicationDoc = await admin
      .firestore()
      .collection("applications")
      .doc(applicationId)
      .get();

    if (!applicationDoc.exists) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    const applicationData = applicationDoc.data() as MissionApplication;
    if (!applicationData) {
      return NextResponse.json(
        { error: "Invalid application data" },
        { status: 400 }
      );
    }

    // Update the application status
    await admin
      .firestore()
      .collection("applications")
      .doc(applicationId)
      .update({
        status,
      });

    // If the application is accepted, update the mission status and doneBy
    if (status === "accepted") {
      await admin
        .firestore()
        .collection("missions")
        .doc(applicationData.missionId)
        .update({
          status: "onGoing",
          doneBy: applicationData.userId,
        });
    }

    // If rejected, remove the user from the mission's applicants array
    if (status === "rejected") {
      await admin
        .firestore()
        .collection("missions")
        .doc(applicationData.missionId)
        .update({
          applicants: admin.firestore.FieldValue.arrayRemove(
            applicationData.userId
          ),
        });
    }

    return NextResponse.json({
      message: "Application status updated successfully",
    });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { applicationId, missionId, userId } = await request.json();

    // Delete the application from Firestore
    try {
      await admin
        .firestore()
        .collection("applications")
        .doc(applicationId)
        .delete();
    } catch (error) {
      console.error("Error deleting application:", error);
      throw error;
    }

    // Remove the user from the mission's applicants array
    try {
      await admin
        .firestore()
        .collection("missions")
        .doc(missionId)
        .update({
          applicants: admin.firestore.FieldValue.arrayRemove(userId),
        });
    } catch (error) {
      console.error(
        "Error removing user from mission's applicants array:",
        error
      );
      throw error;
    }

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    );
  }
}
