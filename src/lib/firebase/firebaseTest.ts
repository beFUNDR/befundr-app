import admin from "@/lib/firebase/firebaseAdmin";
import { getApps } from "firebase/app";

export function testFirebaseInitialization() {
  // Test Firebase Admin
  const adminInitialized = admin.apps.length > 0;
  console.log("Firebase Admin initialisé:", adminInitialized);

  // Test Firebase Client
  const clientApps = getApps();
  const clientInitialized = clientApps.length > 0;
  console.log("Firebase Client initialisé:", clientInitialized);

  return {
    adminInitialized,
    clientInitialized,
  };
}
