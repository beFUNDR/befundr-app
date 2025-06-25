import { ProjectDocument } from "@/features/projects/types";
import admin from "@/lib/firebase/firebase-admin";
import { COLLECTIONS } from "@/lib/firebase/firebase-constants";

export const getProjectDocumentById = async (
  projectId: string
): Promise<ProjectDocument | null> => {
  const projectDocument = await admin
    .firestore()
    .collection("projects")
    .doc(projectId)
    .get();

  const doc = projectDocument.data();

  if (!doc) {
    return null;
  }

  return { id: projectDocument.id, ...doc } as ProjectDocument;
};

export const getProjectDocumentsByOwner = async (
  ownerId: string
): Promise<ProjectDocument[]> => {
  const projectDocument = await admin
    .firestore()
    .collection(COLLECTIONS.PROJECTS)
    .where("owner", "==", ownerId)
    .get();

  if (projectDocument.empty) {
    return [];
  }
  return projectDocument.docs.map(
    (document) => document.data() as ProjectDocument
  );
};
