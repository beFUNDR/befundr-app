import {
  dateSchema,
  firestoreTimestampSchema,
} from "@/shared/schemas/common.schema";
import { z } from "zod";

/**
 * Enum-like schema for mission status
 */
export const MissionStatusSchema = z.enum([
  "open",
  "ongoing",
  "done",
  "cancelled",
]);

/**
 * Zod schema for the Mission object
 */
export const MissionSchema = z.object({
  id: z.string(),
  title: z.string(),
  skill: z.string(),
  projectId: z.string(),
  description: z.string(),
  isPaid: z.boolean(),
  status: MissionStatusSchema,
  createdAt: dateSchema,
  assignee: z.string().optional(),
  applicants: z.array(z.string()),
});

export const MissionDocumentSchema = z.object({
  id: z.string(),
  title: z.string(),
  skill: z.string(),
  projectId: z.string(),
  description: z.string(),
  isPaid: z.boolean(),
  status: MissionStatusSchema,
  createdAt: firestoreTimestampSchema,
  assignee: z.string().optional(),
  applicants: z.array(z.string()),
});

export const PartialMissionSchema = MissionSchema.partial();
export const PartialMissionDocumentSchema = MissionDocumentSchema.partial();
