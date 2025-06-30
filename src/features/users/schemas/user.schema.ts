import { z } from "zod";

export const UserDocumentSchema = z.object({
  id: z.string(),
  wallet: z.string(),
  name: z.string(),
  avatar: z.string(),
  bio: z.string(),
  telegram: z.string(),
  twitter: z.string(),
  website: z.string(),
  discord: z.string(),
  skills: z.array(z.string()),
  isCompleteProfile: z.boolean(),
  displayInSkillsHub: z.boolean(),
});

export const UserSchema = z.object({
  id: z.string(),
  wallet: z.string(),
  name: z.string(),
  avatar: z.string(),
  bio: z.string(),
  telegram: z.string(),
  twitter: z.string(),
  website: z.string(),
  discord: z.string(),
  skills: z.array(z.string()),
  isCompleteProfile: z.boolean(),
  displayInSkillsHub: z.boolean(),
});

export const PartialUserSchema = UserSchema.partial();
export const PartialUserDocumentSchema = UserDocumentSchema.partial();

export const UserDocumentListSchema = z.array(UserDocumentSchema);
