import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import admin from "@/lib/firebase/firebase-admin";

export const uploadImage = async (
  file: File,
  path: string,
  publicKey: string
): Promise<string | null> => {
  const storage = getStorage();
  const storageRef = ref(storage, path);

  // Add userId to the metadata
  const metadata = {
    customMetadata: {
      userId: publicKey,
    },
  };

  try {
    await uploadBytes(storageRef, file, metadata);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image: ", error);
    return null;
  }
};

const isLocalEmulator = process.env.NEXT_PUBLIC_USE_EMULATOR === "true";

export async function uploadImageServer(image: Buffer, path: string) {
  const bucket = admin.storage().bucket();
  const file = bucket.file(path);

  await file.save(image, {
    metadata: {
      contentType: "image/png",
    },
  });

  if (!isLocalEmulator) {
    await file.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${path}`;
  } else {
    // Firebase Emulator local URL format
    const encodedPath = encodeURIComponent(path);
    return `http://localhost:9199/v0/b/${bucket.name}/o/${encodedPath}?alt=media`;
  }
}

export async function blobToBase64(blob: Blob) {
  const arrayBuffer = await blob.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}
