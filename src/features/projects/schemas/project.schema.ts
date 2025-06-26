import { ProjectStatus } from "@/features/projects/constants/project-status";
import { z } from "zod";

export const ProjectSchema = z.object({
  userId: z.string(),
  owner: z.string(),
  name: z.string(),
  category: z.string(),
  mainImage: z.string(),
  logo: z.string(),
  images: z.array(z.string()),
  headLine: z.string(),
  description: z.string(),
  pitchLink: z.string().optional(),
  videoLink: z.string().optional(),
  otherLink: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  telegram: z.string().optional(),
  status: z.nativeEnum(ProjectStatus),
  supportedBy: z.array(z.string()).optional(),
  id: z.string(),
  likesCount: z.array(z.string()),
});

export const ProjectDocumentSchema = z.object({
  userId: z.string(),
  owner: z.string(),
  name: z.string(),
  category: z.string(),
  mainImage: z.string(),
  logo: z.string(),
  images: z.array(z.string()),
  headLine: z.string(),
  description: z.string(),
  pitchLink: z.string().optional(),
  videoLink: z.string().optional(),
  otherLink: z.string().optional(),
  website: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  telegram: z.string().optional(),
  status: z.string(),
  supportedBy: z.array(z.string()).optional(),
  id: z.string(),
  likesCount: z.array(z.string()),
});

export const PartialProjectSchema = ProjectSchema.partial();
export const PartialProjectDocumentSchema = ProjectDocumentSchema.partial();
