import { User, UserDocument } from "@/features/users/types/user.types";
import { fetcher } from "@/shared/api/fetcher";
import {
  db,
  getAllDocumentsFromCollection,
  getDocument,
  getDocumentsWithQuery,
} from "@/shared/utils/firebase-client";
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

export const createUserDocument = async (
  user: Partial<User>
): Promise<User> => {
  const response = await fetcher("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    bodyParams: { user },
  });

  //TODO this should be done in the /api/user route for better performance

  const resGameProgram = await fetcher("/api/game-program", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    bodyParams: {},
  });

  return response;
};

export const updateUserApi = async (user: Partial<User>): Promise<User> => {
  const response = await fetcher("/api/user", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    bodyParams: { user },
  });

  return response;
};
