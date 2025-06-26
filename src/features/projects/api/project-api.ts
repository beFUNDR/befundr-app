import { ProjectDocument } from "@/features/projects/types";
import { COLLECTIONS } from "@/lib/firebase/firebase-constants";
import { fetcher } from "@/shared/api/fetcher";
import {
  db,
  fileToBase64,
  getAllDocumentsFromCollection,
  getDocument,
  getDocumentsWithQuery,
} from "@/shared/utils/firebase-client";
import {
  collection,
  CollectionReference,
  query,
  where,
} from "firebase/firestore";

export const getProjectDocument = async (
  projectId: string
): Promise<ProjectDocument | undefined> => {
  const { result, error } = await getDocument<ProjectDocument>(
    COLLECTIONS.PROJECTS,
    projectId
  );
  if (error) throw error;
  return result?.data;
};

export const getAllProjectsDocuments = async (): Promise<ProjectDocument[]> => {
  const { results, error } =
    await getAllDocumentsFromCollection<ProjectDocument>(COLLECTIONS.PROJECTS);
  if (error) throw error;
  return results.map((doc) => doc.data);
};

export const getProjectsDocumentsByOwner = async (
  ownerId: string
): Promise<ProjectDocument[]> => {
  const projectsRef = collection(
    db,
    COLLECTIONS.PROJECTS
  ) as CollectionReference<ProjectDocument>;
  const q = query(projectsRef, where("owner", "==", ownerId));
  const { results, error } = await getDocumentsWithQuery<ProjectDocument>(q);
  if (error) throw error;
  return results;
};

export const createProjectDocument = async (
  project: Partial<ProjectDocument>
): Promise<ProjectDocument> => {
  const response = await fetcher("/api/project", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    bodyParams: { project },
  });

  return response;
};

export const updateProjectDocument = async (
  project: Partial<ProjectDocument>,
  mainImage: string,
  logo: string,
  images: string[]
): Promise<ProjectDocument> => {
  const response = await fetcher("/api/project", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    bodyParams: { project, mainImage, logo, images },
  });

  return response;
};
