import { NextRequest, NextResponse } from "next/server";
import { SolanaSignInInput } from "@solana/wallet-standard-features";
import admin from "@/lib/firebase/firebase-admin";
import { randomBytes } from "crypto";
import bs58 from "bs58";
export async function POST(req: NextRequest) {
  try {
    const publicKey = req.nextUrl.searchParams.get("publicKey");
    if (!publicKey) {
      return NextResponse.json({ error: "Missing publicKey" }, { status: 400 });
    }

    const now = new Date();
    const uri = req.headers.get("origin") || "";
    const domain = new URL(uri).host;
    const currentDateTime = now.toISOString();
    const nonce = (await getValidNonceForPublicKey(publicKey)).nonce;

    const signInData: SolanaSignInInput = {
      domain,
      statement:
        "Clicking Sign or Approve only means you have proved this wallet is owned by you. This request will not trigger any blockchain transaction or cost any gas fee.",
      version: "1",
      nonce: nonce,
      chainId: "solana:mainnet",
      issuedAt: currentDateTime,
    };

    return NextResponse.json({ signInData });
  } catch (error) {
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 }
    );
  }
}

const NONCE_EXPIRATION_MS = 5 * 60 * 1000; // 5 minutes

const getValidNonceForPublicKey = async (publicKey: string) => {
  const now = Date.now();
  const nonceRef = admin.firestore().collection("siws-nonces").doc(publicKey);
  const doc = await nonceRef.get();

  let nonce: string | undefined;
  let issuedAt: string | undefined;

  if (doc.exists) {
    const data = doc.data()!;
    const created = new Date(data.createdAt).getTime();
    const age = now - created;
    if (age < NONCE_EXPIRATION_MS && !data.used) {
      nonce = data.nonce;
      issuedAt = data.createdAt;
    }
  }

  if (!nonce) {
    nonce = bs58.encode(randomBytes(8));
    issuedAt = new Date(now).toISOString();
    await nonceRef.set({ nonce, createdAt: issuedAt, used: false });
  }

  return { nonce, issuedAt };
};
