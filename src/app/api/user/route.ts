import admin from "@/lib/firebase/firebaseAdmin";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    //* GET THE DATA FROM THE REQUEST
    const userWallet = req.nextUrl.searchParams.get("wallet");

    //* CHECK IF THE WALLET IS VALID
    if (!userWallet) {
      return NextResponse.json(
        { error: "Wallet is required" },
        { status: 400 }
      );
    }

    //* GET THE DATA
    const userDoc = await admin
      .firestore()
      .collection("users")
      .doc(userWallet)
      .get();
    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    //* RETURN THE DATA
    return NextResponse.json(userDoc.data(), { status: 200 });
  } catch (error) {
    console.error("Error getting user data", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { wallet } = await req.json();

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet is required" },
        { status: 400 }
      );
    }

    // Créer un nouveau document utilisateur avec des valeurs par défaut
    const newUser: User = {
      wallet,
      name: "",
      avatar: "",
      bio: "",
      telegram: "",
      twitter: "",
      website: "",
      discord: "",
    };

    await admin.firestore().collection("users").doc(wallet).set(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { wallet, ...fields } = await req.json();
    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet is required" },
        { status: 400 }
      );
    }
    const userRef = admin.firestore().collection("users").doc(wallet);
    await userRef.update(fields);
    const updatedDoc = await userRef.get();
    return NextResponse.json(updatedDoc.data(), { status: 200 });
  } catch (error) {
    console.error("Error updating user", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
