import { NextRequest } from "next/server";

/**
 * Extracts a Bearer token from the Authorization header of a NextRequest.
 * Throws an error if the header is missing or malformed.
 */
export const extractBearerToken = (req: NextRequest): string => {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Missing or invalid Authorization header");
  }
  return authHeader.replace("Bearer ", "").trim();
};

export function checkUserIdAuthorization(
  currentUserId: string,
  resourceOwnerId: string
): void {
  if (currentUserId !== resourceOwnerId) {
    console.error(
      `[Auth]User ${currentUserId} not matching resource owner id ${resourceOwnerId}`
    );
    throw new Error("Unauthorized: User ID mismatch");
  }
}
