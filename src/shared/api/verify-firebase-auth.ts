import { extractBearerToken } from "./auth";
import { verifyFirebaseToken } from "@/lib/firebase/verify-token";
import { NextRequest } from "next/server";

/**
 * Verifies Firebase authentication from a NextRequest.
 * Returns the uid if valid, throws if invalid.
 */
export const verifyFirebaseAuth = async (req: NextRequest) => {
  const token = extractBearerToken(req);

  return (await verifyFirebaseToken(token)).uid;
};
