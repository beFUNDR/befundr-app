import {
  MissionSchema,
  MissionDocumentSchema,
  MissionStatusSchema,
} from "@/features/missions/schemas/missions-schema";
import z from "zod";

export type MissionDocument = z.infer<typeof MissionDocumentSchema>;
export type Mission = z.infer<typeof MissionSchema>;
export type MissionStatus = z.infer<typeof MissionStatusSchema>;
