import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { verifySignIn } from "@solana/wallet-standard-util";
import admin from "@/lib/firebase/firebase-admin";
import { PublicKey } from "@solana/web3.js";

export async function POST(req: NextRequest) {
  try {
    const { input, output } = await req.json();
    const backendInput: SolanaSignInInput = input;
    const backendOutput: SolanaSignInOutput = {
      account: {
        ...output.account,
        publicKey: new Uint8Array(Object.values(output.account.publicKey)),
      },
      signature: new Uint8Array(Buffer.from(output.signature)),
      signedMessage: new Uint8Array(Buffer.from(output.signedMessage)),
    };
    const publicKey = new PublicKey(backendOutput.account.publicKey).toBase58();

    if (!publicKey) {
      return NextResponse.json({ error: "Missing publicKey" }, { status: 400 });
    }

    const nonceRef = admin.firestore().collection("siws-nonces").doc(publicKey);
    const nonceDoc = await nonceRef.get();
    if (!nonceDoc.exists) {
      return NextResponse.json({ error: "Nonce not found" }, { status: 400 });
    }

    const { nonce: storedNonce, used }: any = nonceDoc.data();

    if (used) {
      return NextResponse.json(
        { error: "Nonce already used" },
        { status: 400 }
      );
    }

    if (backendInput.nonce !== storedNonce) {
      return NextResponse.json({ error: "Nonce mismatch" }, { status: 400 });
    }

    if (!verifySignIn(backendInput, backendOutput)) {
      return NextResponse.json(
        { status: "error", message: "Sign In verification failed!" },
        { status: 401 }
      );
    }

    // Create a Firebase custom token using the user's publicKey as UID
    try {
      await getAuth().getUser(publicKey);
    } catch {
      await getAuth().createUser({ uid: publicKey });
    }

    const token = await getAuth().createCustomToken(publicKey);

    await nonceRef.update({
      used: true,
      usedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { status: "success", token },
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("SIWS Auth Error:", error);
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 }
    );
  }
}
