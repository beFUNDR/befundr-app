import {
  PartialProjectDocumentSchema,
  PartialProjectSchema,
  ProjectDocumentSchema,
  ProjectSchema,
} from "@/features/projects/schemas/project.schema";
import { Project, ProjectDocument } from "@/features/projects/types";

export const convertProjectFromDocument = (doc: ProjectDocument): Project => {
  const parsedProjectDocument = ProjectDocumentSchema.parse(doc);

  return ProjectSchema.parse(parsedProjectDocument);
};

export const convertProjectsFromDocuments = (
  docs: ProjectDocument[]
): Project[] => {
  const parsedProjectsDocuments = ProjectDocumentSchema.array().parse(docs);

  return ProjectSchema.array().parse(parsedProjectsDocuments);
};

export const convertPartialProjectToDocument = (
  project: Partial<Project>
): Partial<ProjectDocument> => {
  const parsed = PartialProjectSchema.parse(project);

  return PartialProjectDocumentSchema.parse(parsed);
};
