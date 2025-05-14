import { ProjectStatus, projectSteps } from "@/data/ProjectStatus";
import { useProject } from "@/hooks/dbData/project/useProject";
import { useState } from "react";
import ModalLayout from "./_ModalLayout";
import ButtonLabel from "../buttons/_ButtonLabel";

type Props = {
  project: Project;
  onClose: () => void;
  initialStatus?: ProjectStatus;
  onStatusChange?: (newStatus: ProjectStatus) => void;
};

export const handleProjectStepAction = async (
  currentStatus: ProjectStatus,
  project: Project,
  updateFun: any
): Promise<any> => {
  switch (currentStatus) {
    case ProjectStatus.WaitingForApproval:
      return await updateFun(project);
    case ProjectStatus.NftMintRound:
      console.log("→ Déclenchement du mint NFT...");
      return "proceed";

    case ProjectStatus.PublicSale:
      console.log("→ Lancement de la vente publique...");
      return "proceed";

    default:
      return "proceed";
  }
};

const AdminModal = ({
  project,
  onClose,
  initialStatus = ProjectStatus.WaitingForApproval,
  onStatusChange,
}: Props) => {
  const [status, setStatus] = useState<ProjectStatus>(
    project.status as ProjectStatus
  );
  const currentStepIndex = projectSteps.findIndex(
    (step) => step.key === status
  );

  const { approveProject } = useProject();

  const handleNext = async () => {
    const current = status;
    const currentStepIndex = projectSteps.findIndex((s) => s.key === current);
    if (currentStepIndex >= projectSteps.length - 1) return;

    const result = await handleProjectStepAction(
      current,
      project,
      approveProject
    );

    if (result === "proceed") {
      const nextStatus = projectSteps[currentStepIndex + 1].key;
      setStatus(nextStatus);
      onStatusChange?.(nextStatus);
    }
  };

  return (
    <ModalLayout justify="center" item="center" onClose={onClose}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Project status</h2>
      </div>

      <p className="mb-6">
        <span className="font-semibold">Current Status:</span>{" "}
        <span className="text-accent">{status}</span>
      </p>

      <div className="flex items-center overflow-x-auto pb-4">
        {projectSteps.map(({ key, label }, idx) => {
          const isActive = idx === currentStepIndex;
          const isCompleted = idx < currentStepIndex;

          return (
            <div key={key} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
      ${
        isCompleted
          ? "bg-green-500 text-white"
          : isActive
          ? "bg-accent text-gray-900"
          : "bg-gray-300 text-gray-600"
      }`}
                >
                  {idx + 1}
                </div>
                <div className="absolute mt-10 text-xs text-center w-12">
                  {label}
                </div>
              </div>

              {idx < projectSteps.length - 1 && (
                <div className="w-8 h-1 bg-gray-300 mx-1"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={handleNext}
          disabled={!projectSteps[currentStepIndex]?.nextAction}
        >
          <ButtonLabel
            label={
              projectSteps[currentStepIndex]?.nextAction ?? "No action possible"
            }
          />
        </button>
      </div>
    </ModalLayout>
  );
};

export default AdminModal;
