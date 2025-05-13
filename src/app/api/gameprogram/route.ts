import admin from "@/lib/firebase/firebaseAdmin";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //* GET THE DATA FROM THE REQUEST
    const userId = req.nextUrl.searchParams.get("userId");

    //* CHECK IF THE USER ID IS VALID
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    //* GET THE DATA
    const gameProgramDoc = await admin
      .firestore()
      .collection("gamePrograms")
      .doc(userId)
      .get();

    if (!gameProgramDoc.exists) {
      return NextResponse.json(
        { error: "Game program not found" },
        { status: 404 }
      );
    }

    //* RETURN THE DATA
    return NextResponse.json(gameProgramDoc.data(), { status: 200 });
  } catch (error) {
    console.error("Error getting game program data", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Créer un nouveau game program avec points = 0
    const newGameProgram = {
      points: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    // Utiliser l'userId comme ID du document
    const gameProgramRef = admin
      .firestore()
      .collection("gamePrograms")
      .doc(userId);
    await gameProgramRef.set(newGameProgram);

    return NextResponse.json(newGameProgram, { status: 201 });
  } catch (error) {
    console.error("Error creating game program", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { userId, pointsToAdd } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    if (typeof pointsToAdd !== "number") {
      return NextResponse.json(
        { error: "Points to add must be a number" },
        { status: 400 }
      );
    }

    const gameProgramRef = admin
      .firestore()
      .collection("gamePrograms")
      .doc(userId);

    // Utiliser une transaction pour s'assurer que la mise à jour est atomique
    await admin.firestore().runTransaction(async (transaction) => {
      const gameProgramDoc = await transaction.get(gameProgramRef);

      if (!gameProgramDoc.exists) {
        throw new Error("Game program not found");
      }

      const currentPoints = gameProgramDoc.data()?.points || 0;
      const newPoints = currentPoints + pointsToAdd;

      transaction.update(gameProgramRef, {
        points: newPoints,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    });

    // Récupérer le document mis à jour
    const updatedDoc = await gameProgramRef.get();
    return NextResponse.json(updatedDoc.data(), { status: 200 });
  } catch (error) {
    console.error("Error updating game program", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
