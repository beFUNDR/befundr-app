import {
  PartialUserDocumentSchema,
  PartialUserSchema,
  UserDocumentSchema,
  UserSchema,
} from "@/features/users/schemas/user.schema";
import { User, UserDocument } from "@/features/users/types/user.types";

export const convertUserFromDocument = (doc: UserDocument): User => {
  const parsedDoc = UserDocumentSchema.parse(doc);

  return UserSchema.parse(parsedDoc);
};

export const convertUserToDocument = (user: User): UserDocument => {
  const parsedDoc: UserDocument = UserDocumentSchema.parse(user);

  return UserSchema.parse(parsedDoc);
};

export const convertPartialUserToDocument = (
  user: Partial<User>
): Partial<UserDocument> => {
  const parsed = PartialUserSchema.parse(user);

  return PartialUserDocumentSchema.parse(parsed);
};

export const convertUsersFromDocuments = (docs: UserDocument[]): User[] => {
  const users = UserDocumentSchema.array().parse(docs);

  return UserSchema.array().parse(users);
};
