import { ProjectStatus } from "@/data/ProjectStatus";

type UpdateFunction = (...args: any[]) => Promise<any>;

export const handleProjectStepAction = async (
    currentStatus: ProjectStatus,
    project: Project,
    updateFun: UpdateFunction,
    params: any = {}
): Promise<"proceed" | "halt"> => {
    switch (currentStatus) {
        case ProjectStatus.WaitingForApproval:
            return await updateFun(project);

        case ProjectStatus.NftMintRound:
            return await updateFun({
                project,
                ...params
            });

        case ProjectStatus.PublicSale:
            return "proceed";

        default:
            return "proceed";
    }
};
