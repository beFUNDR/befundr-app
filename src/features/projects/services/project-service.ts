import {
  createProjectDocument,
  getAllProjectsDocuments,
  getProjectDocument,
  getProjectsDocumentsByOwner,
  updateProjectDocument,
} from "@/features/projects/api/project-api";
import {
  convertPartialProjectToDocument,
  convertProjectFromDocument,
  convertProjectsFromDocuments,
} from "@/features/projects/converters/project-converter";
import { Project } from "@/features/projects/types";

export const getProject = async (projectId: string): Promise<Project> => {
  try {
    const doc = await getProjectDocument(projectId);
    if (!doc) throw new Error(`Project not found`);
    return convertProjectFromDocument(doc);
  } catch (error) {
    console.error(
      `Service: Failed to get project with id: ${projectId}`,
      error
    );
    throw error;
  }
};

export const getAllProjects = async (): Promise<Project[]> => {
  try {
    const projectDocuments = await getAllProjectsDocuments();
    const projects = convertProjectsFromDocuments(projectDocuments);
    return projects;
  } catch (error) {
    console.error("Service: Failed to get all projects", error);
    throw error;
  }
};

/**
 * Fetches and converts all projects owned by a given user.
 *
 * @param ownerId - The ID of the project owner.
 * @returns An array of `Project` objects associated with the owner.
 * @throws If the fetch or conversion fails.
 */
export const getProjectsByOwner = async (
  ownerId: string
): Promise<Project[]> => {
  try {
    const rawProjects = await getProjectsDocumentsByOwner(ownerId);
    return convertProjectsFromDocuments(rawProjects);
  } catch (error) {
    console.error(`Error while getting projects for owner: ${ownerId}`, error);
    throw error;
  }
};

export const createProject = async (
  project: Partial<Project>
): Promise<Partial<Project>> => {
  try {
    const projectDocument = convertPartialProjectToDocument(project);
    createProjectDocument(projectDocument);
    return project;
  } catch (error) {
    console.error("Error while creating project", error);
    throw error;
  }
};

export const updateProject = async (
  project: Partial<Project>,
  mainImage: string,
  logo: string,
  images: string[]
): Promise<Partial<Project>> => {
  try {
    const projectDocument = convertPartialProjectToDocument(project);
    updateProjectDocument(projectDocument, mainImage, logo, images);
    return project;
  } catch (error) {
    console.error("Error while updating project", error);
    throw error;
  }
};
