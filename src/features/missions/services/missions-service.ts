import {
  convertMissionFromDocument,
  convertMissionsFromDocuments,
  convertMissionToDocument,
  convertPartialMissionToDocument,
  createMissionDocument,
  deleteMissionDocument,
  getMissionDocumentById,
  getMissionsDocumentsByAssignee,
  getMissionsDocumentsByProjectId,
  Mission,
  MissionDocument,
  updateMissionDocument,
} from "@/features/missions";

export const getMissionById = async (
  missionId: string
): Promise<Mission | undefined> => {
  try {
    const rawMission = await getMissionDocumentById(missionId);
    if (!rawMission) {
      return undefined;
    }
    return convertMissionFromDocument({ ...rawMission.data });
  } catch (error) {
    console.error(`Failed to get mission with id ${missionId}`, error);
    throw error;
  }
};

export const createMission = async (
  mission: MissionToCreate
): Promise<MissionDocument> => {
  try {
    return await createMissionDocument(mission);
  } catch (error) {
    console.error("Failed to create mission", error);
    throw error;
  }
};

export const getMissionsByProjectId = async (
  projectId: string
): Promise<Mission[]> => {
  try {
    const rawMissions = await getMissionsDocumentsByProjectId(projectId);
    return convertMissionsFromDocuments(rawMissions);
  } catch (error) {
    console.error(`Failed to get missions for project id ${projectId}`, error);
    throw error;
  }
};

export const getMissionsByAssignee = async (
  userId: string
): Promise<Mission[]> => {
  try {
    const rawMissions = await getMissionsDocumentsByAssignee(userId);
    return convertMissionsFromDocuments(rawMissions);
  } catch (error) {
    console.error(
      `Failed to get missions for assignee with id ${userId}`,
      error
    );
    throw error;
  }
};

export const updateMission = async (
  mission: Partial<Mission>
): Promise<Mission> => {
  try {
    const missionDocument = convertPartialMissionToDocument(mission);
    return updateMissionDocument(missionDocument);
  } catch (error) {
    console.error(`Failed to update mission with id ${mission.id}`, error);
    throw error;
  }
};

export const deleteMissionById = async (
  missionId: string
): Promise<Mission | undefined> => {
  try {
    return deleteMissionDocument(missionId);
  } catch (error) {
    console.error(`Failed to delete mission with id ${missionId}`, error);
    throw error;
  }
};
