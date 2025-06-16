import * as admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;

  const credential = admin.credential.cert({
    projectId,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  });

  admin.initializeApp({
    credential,
    projectId,
    storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
  });

  const firestore = admin.firestore();

  if (process.env.USE_EMULATOR === 'true') {
    firestore.settings({ host: 'localhost:8080', ssl: false });
  }
}

export default admin;
