import {
  collection,
  connectFirestoreEmulator,
  doc,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import firebase_app from "@/lib/firebase/firebaseInit";
import { connectAuthEmulator, getAuth } from "firebase/auth";


const db = getFirestore(firebase_app);

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_USE_EMULATOR === 'true') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result as string;
      resolve(base64data.split(",")[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Function to retrieve a document from a Firestore collection
export async function getDocument<T>(
  collection: string,
  id: string
): Promise<{ result: T | null; error: Error | null }> {
  // Create a document reference using the provided collection and ID
  const docRef = doc(db, collection, id);
  // Variable to store the result of the operation
  let result: T | null = null;
  // Variable to store any error that occurs during the operation
  let error: Error | null = null;

  try {
    // Retrieve the document using the document reference
    const docSnapshot: DocumentSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      // Use the data in the document
      result = docSnapshot.data() as T; // This is already of type T
    } else {
      // Handle the case where the document does not exist
      console.log("No such document!");
    }
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e instanceof Error ? e : new Error("An unknown error occurred");
  }

  // Return the result and error as an object
  return { result, error };
}

// Function to retrieve all documents from a Firestore collection
export async function getAllDocumentsFromCollection<T>(
  collectionName: string
): Promise<{ results: { data: T; id: string }[]; error: Error | null }> {
  // Variable to store the results of the operation
  const results: { data: T; id: string }[] = [];
  // Variable to store any error that occurs during the operation
  let error = null;

  try {
    // Create a collection reference using the provided collection name
    const colRef = collection(db, collectionName);
    // Retrieve all documents from the collection
    const querySnapshot = await getDocs(colRef);
    // Iterate over each document in the collection
    querySnapshot.forEach((doc) => {
      // Add each document's data and id separately to the results array
      results.push({
        data: doc.data() as T,
        id: doc.id,
      });
    });
  } catch (e) {
    // Catch and store any error that occurs during the operation
    error = e instanceof Error ? e : new Error("An unknown error occurred");
  }

  // Return the results and any error as an object
  return { results, error };
}

export const getFirebaseAuth = () => {
  const firebaseAuth = getAuth(firebase_app)
  if (process.env.NEXT_PUBLIC_USE_EMULATOR == "true") {
    connectAuthEmulator(firebaseAuth, `http://localhost:9099`, {
      disableWarnings: true,
    })
  }
  return firebaseAuth;
}

export const auth = getFirebaseAuth();
