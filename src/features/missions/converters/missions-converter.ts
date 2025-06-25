import { Mission, MissionDocument } from "../types/missions-types";
import {
  MissionDocumentSchema,
  MissionSchema,
  PartialMissionDocumentSchema,
  PartialMissionSchema,
} from "@/features/missions/schemas/missions-schema";

export const convertMissionFromDocument = (doc: MissionDocument): Mission => {
  const parsedDoc: MissionDocument = MissionDocumentSchema.parse(doc);
  return MissionSchema.parse(parsedDoc);
};

export const convertMissionToDocument = (doc: Mission): MissionDocument => {
  const parsedMission: Mission = MissionSchema.parse(doc);
  return MissionDocumentSchema.parse(parsedMission);
};

export const convertPartialMissionToDocument = (
  doc: Partial<Mission>
): Partial<MissionDocument> => {
  const parsedMission = PartialMissionSchema.parse(doc);
  return PartialMissionDocumentSchema.parse(parsedMission);
};

export const convertMissionsFromDocuments = (
  docs: MissionDocument[]
): Mission[] => {
  const missions = MissionDocumentSchema.array().parse(docs);
  return MissionSchema.array().parse(missions);
};
