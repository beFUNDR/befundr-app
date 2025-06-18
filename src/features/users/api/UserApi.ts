import { User, UserDocument } from "@/features/users/types/user.types";
import {
  db,
  getAllDocumentsFromCollection,
  getDocument,
  getDocumentsWithQuery,
} from "@/shared/utils/firebaseClient";
import {
  collection,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";

export const getUserApi = async (
  userId: string
): Promise<UserDocument | undefined> => {
  const { result, error } = await getDocument<UserDocument>("users", userId);
  if (error) throw error;
  return result?.data;
};

export const getAllUsersApi = async (): Promise<UserDocument[]> => {
  const { results, error } =
    await getAllDocumentsFromCollection<UserDocument>("users");
  if (error) throw error;
  return results.map((doc) => doc.data);
};

export const getUsersApi = async (
  userIds: string[]
): Promise<UserDocument[]> => {
  const usersRef = collection(db, "users") as CollectionReference<UserDocument>;
  const q = query(usersRef, where("wallet", "in", userIds));
  const { results, error } = await getDocumentsWithQuery<User>(q);
  if (error) throw error;
  return results;
};

export const updateUserApi = async (user: Partial<User>): Promise<User> => {
  const response = await fetch("/api/user", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Update failed: ${errorText}`);
  }

  return response.json();
};
