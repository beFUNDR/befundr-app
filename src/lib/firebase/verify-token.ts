import admin from "@/lib/firebase/firebase-admin";

/**
 * Verifies a Firebase ID token using Firebase Admin SDK.
 * Returns decoded token if valid.
 */
export const verifyFirebaseToken = async (token: string) => {
  return await admin.auth().verifyIdToken(token);
};
