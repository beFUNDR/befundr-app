import { ProjectStatus } from "@/features/projects/constants/project-status";
import { Project } from "@/features/projects/types";

type UpdateFunction = (...args: any[]) => Promise<any>;

//TODO Delete this file as it is a useless duplicate in the workflow
export const handleProjectStepAction = async (
  currentStatus: ProjectStatus,
  project: Project,
  updateFun: UpdateFunction,
  params: any = {}
): Promise<"proceed" | "halt"> => {
  switch (currentStatus) {
    case ProjectStatus.WaitingForApproval:
      return await updateFun(project);

    case ProjectStatus.Published:
      return await updateFun({ project, ...params });

    case ProjectStatus.NftMintRound:
      return await updateFun({
        project,
        ...params,
      });

    case ProjectStatus.PublicSale:
      return await updateFun({
        project,
        ...params,
      });

    default:
      return "proceed";
  }
};
