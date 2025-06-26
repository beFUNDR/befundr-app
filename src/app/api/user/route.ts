import { User, UserDocument } from "@/features/users/types/user.types";
import admin from "@/lib/firebase/firebase-admin";
import { COLLECTIONS } from "@/lib/firebase/firebase-constants";
import { verifyFirebaseAuth } from "@/shared/api/verify-firebase-auth";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const isCompleteProfile = (user: User): boolean => {
  // required field
  const hasRequiredFields = user.name?.trim() !== "" && user.bio?.trim() !== "";

  // at least one social link
  const hasSocialLink =
    user.telegram?.trim() !== "" ||
    user.twitter?.trim() !== "" ||
    user.website?.trim() !== "" ||
    user.discord?.trim() !== "";

  // at least one skill
  const hasSkills = user.skills && user.skills.length > 0;

  return hasRequiredFields && hasSocialLink && hasSkills;
};

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
      .collection(COLLECTIONS.USERS)
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

export async function POST(request: NextRequest) {
  try {
    const uid = await verifyFirebaseAuth(request);

    const { user }: { user: User } = await request.json();

    if (!user) {
      return NextResponse.json(
        { error: "Wallet is required" },
        { status: 400 }
      );
    }

    const newUser: UserDocument = {
      id: uid,
      wallet: uid,
      name: "",
      avatar: "",
      bio: "",
      telegram: "",
      twitter: "",
      website: "",
      discord: "",
      skills: [],
      isCompleteProfile: false,
    };

    await admin.firestore().collection(COLLECTIONS.USERS).doc(uid).set(newUser);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const uid = await verifyFirebaseAuth(request);

    const { user } = await request.json();

    const userRef = admin.firestore().collection(COLLECTIONS.USERS).doc(uid);
    const currentUser = await userRef.get();
    const currentData = currentUser.data() as UserDocument;

    //TODO only update the relevant fields (nickname, bio, etc. Not images etc.)
    const updatedUser = {
      ...currentData,
      ...user,
      id: uid,
      wallet: uid,
    };

    const isComplete = isCompleteProfile(updatedUser);

    await userRef.update({
      ...updatedUser,
      isCompleteProfile: isComplete,
    });

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
