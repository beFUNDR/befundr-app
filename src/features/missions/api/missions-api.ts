import { MissionDocument } from "@/features/missions";
import { fetcher } from "@/shared/api/fetcher";
import {
  db,
  getDocument,
  getDocumentsWithQuery,
} from "@/shared/utils/firebase-client";
import {
  collection,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";

export const getMissionDocumentById = async (missionId: string) => {
  const { result, error } = await getDocument<MissionDocument>(
    "missions",
    missionId
  );
  if (error) throw error;
  return result?.data;
};

export const getMissionsDocumentsByProjectId = async (projectId: string) => {
  const missionsRef = collection(
    db,
    "missions"
  ) as CollectionReference<MissionDocument>;
  const q = query(missionsRef, where("projectId", "==", projectId));
  const { results, error } = await getDocumentsWithQuery<MissionDocument>(q);

  if (error) throw error;
  return results;
};

export const createMissionDocument = async (mission: MissionToCreate) => {
  const response = await fetcher("/api/mission", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    bodyParams: { mission },
  });
  return response;
};

export const getMissionsDocumentsByAssignee = async (assigneeId: string) => {
  const missionsRef = collection(
    db,
    "missions"
  ) as CollectionReference<MissionDocument>;
  const q = query(missionsRef, where("assignee", "==", assigneeId));
  const { results, error } = await getDocumentsWithQuery<MissionDocument>(q);
  if (error) throw error;
  return results;
};

export const updateMissionDocument = async (
  mission: Partial<MissionDocument>
) => {
  const response = await fetcher(`/api/mission/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    bodyParams: { mission },
  });
  return response;
};

export const deleteMissionDocument = async (missionId: string) => {
  const response = await fetcher(`/api/mission/`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    bodyParams: { missionId },
  });
  return response;
};
