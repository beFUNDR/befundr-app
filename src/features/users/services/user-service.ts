import {
  getAllUsersApi,
  getUserApi,
  getUsersApi,
  updateUserApi,
} from "@/features/users/api/user-api";
import {
  convertPartialUserToDocument,
  convertUserFromDocument,
  convertUsersFromDocuments,
  convertUserToDocument,
} from "@/features/users/converters/user-converter";
import { User } from "@/features/users/types/user.types";

export const getUser = async (userId: string): Promise<User> => {
  try {
    const doc = await getUserApi(userId);
    if (!doc) throw new Error(`User not found`);
    return convertUserFromDocument(doc);
  } catch (error) {
    console.error(`Service: Failed to get user with id: ${userId}`, error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const userDocuments = await getAllUsersApi();
    const users = convertUsersFromDocuments(userDocuments);
    return users;
  } catch (error) {
    console.error("Service: Failed to get all users", error);
    throw error;
  }
};

export const getUsers = async (userIds: string[]): Promise<User[]> => {
  try {
    const userDocuments = await getUsersApi(userIds);
    const users = convertUsersFromDocuments(userDocuments);
    return users;
  } catch (error) {
    console.error("Error while getting users:", error);
    throw error;
  }
};

export const updateUser = async (
  user: Partial<User>
): Promise<Partial<User>> => {
  try {
    const userDocument = convertPartialUserToDocument(user);
    await updateUserApi(userDocument);

    return user;
  } catch (error) {
    console.error(`Error while updating user with id: ${user.wallet}`, error);
    throw error;
  }
};
