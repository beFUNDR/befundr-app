import {
  UserDocumentSchema,
  UserSchema,
} from "@/features/users/schemas/user.schema";
import z from "zod";

// This type is used for the user in the application
export type User = z.infer<typeof UserSchema>;

// This type is used for the user document in Firestore
export type UserDocument = z.infer<typeof UserDocumentSchema>;
