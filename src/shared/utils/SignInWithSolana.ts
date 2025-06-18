import {
  SolanaSignInInput,
  SolanaSignInOutput,
} from "@solana/wallet-standard-features";
import { signInWithCustomToken } from "firebase/auth";
import { SignInMessageSignerWalletAdapterProps } from "@solana/wallet-adapter-base";
import { PublicKey } from "@solana/web3.js";
import { auth } from "@/shared/utils/firebaseClient";

/**
 * Initiates a Sign-In With Solana (SIWS) authentication flow,
 * generates and signs a message using the connected wallet,
 * and authenticates with Firebase using a custom token.
 *
 * @param signIn - Wallet adapter method to trigger message signing
 * @param publicKey - The public key of the currently connected wallet
 * @returns The Firebase custom token (JWT) used for authentication
 * @throws If any step fails (e.g., message generation, signing, or token exchange)
 */
export async function signInWithSolana(
  signIn: SignInMessageSignerWalletAdapterProps["signIn"],
  publicKey: PublicKey
): Promise<string> {
  // Ensure Firebase Auth is initialized
  if (!auth) {
    throw new Error("Firebase auth is not initialized");
  }

  // 1. Request a SIWS-compliant message from the backend, including a nonce
  const createRes = await fetch(
    `/api/auth/siws-message?publicKey=${publicKey.toBase58()}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (!createRes.ok) throw new Error("Failed to get sign-in input");

  const { signInData }: { signInData: SolanaSignInInput } =
    await createRes.json();

  // 2. Ask the wallet to sign the generated message
  let signInResult;
  try {
    signInResult = await signIn(signInData);
  } catch (error: any) {
    throw new Error(`signIn error: ${error.error.code}`);
  }

  // 3. Format the result into a valid SolanaSignInOutput payload
  const output: SolanaSignInOutput = {
    ...signInResult,
    account: {
      address: signInResult.account.address,
      publicKey: signInResult.account.publicKey,
      chains: signInResult.account.chains,
      features: signInResult.account.features,
      label: signInResult.account.label,
      icon: signInResult.account.icon,
    },
  };

  // 4. Send the signed message to the backend to verify and issue a Firebase custom token
  const verifyRes = await fetch("/api/auth/verify-siws", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ input: signInData, output }),
  });

  const result = await verifyRes.json();

  if (!verifyRes.ok) throw new Error(result.error);

  // 5. Authenticate with Firebase using the issued custom token
  await signInWithCustomToken(auth, result.token);

  // Return the token in case it's needed for other client-side logic
  return result.token;
}
