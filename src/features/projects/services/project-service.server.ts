import {
  getProjectDocumentById,
  getProjectDocumentsByOwner,
} from "@/features/projects/api/project-api.server";
import { ProjectStatus } from "@/features/projects/constants/project-status";
import {
  convertProjectFromDocument,
  convertProjectsFromDocuments,
} from "@/features/projects/converters/project-converter";
import { Project } from "@/features/projects/types";

/**
 * Fetches and converts a project by its ID.
 *
 * @param projectId - The ID of the project to retrieve.
 * @returns A `Project` object if found, otherwise `undefined`.
 * @throws If the fetch or conversion fails.
 */
export const getProjectById = async (
  projectId: string
): Promise<Project | undefined> => {
  try {
    const rawProject = await getProjectDocumentById(projectId);
    return convertProjectFromDocument(rawProject);
  } catch (error) {
    console.error(`Error while getting project: ${projectId}`, error);
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
    const rawProjects = await getProjectDocumentsByOwner(ownerId);
    return convertProjectsFromDocuments(rawProjects);
  } catch (error) {
    console.error(`Error while getting projects for owner: ${ownerId}`, error);
    throw error;
  }
};

/**
 * Checks whether a given owner has any ongoing projects.
 * Ongoing projects are those not marked as "Abandoned" or "Live".
 *
 * @param ownerId - The ID of the user.
 * @returns `true` if at least one project is not in a terminal state, otherwise `false`.
 */
export const hasOngoingProject = async (ownerId: string): Promise<boolean> => {
  const projects = await getProjectsByOwner(ownerId);
  const ongoingStatus = [ProjectStatus.Abandoned, ProjectStatus.Live];
  return !projects.every((project) => ongoingStatus.includes(project.status));
};
