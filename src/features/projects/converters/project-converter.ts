import {
  ProjectDocumentSchema,
  ProjectSchema,
} from "@/features/projects/schemas/project.schema";
import { Project, ProjectDocument } from "@/features/projects/types";

export const convertProjectFromDocument = (
  doc: ProjectDocument | null
): Project | undefined => {
  if (!doc) {
    return undefined;
  }
  const parsedProjectDocument = ProjectDocumentSchema.parse(doc);

  return ProjectSchema.parse(parsedProjectDocument);
};

export const convertProjectsFromDocuments = (
  docs: ProjectDocument[]
): Project[] => {
  const parsedProjectsDocuments = ProjectDocumentSchema.array().parse(docs);

  return ProjectSchema.array().parse(parsedProjectsDocuments);
};
