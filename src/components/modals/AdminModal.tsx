import {
  ProjectStatus,
  projectSteps,
} from "@/features/projects/constants/project-status";
import { useProject } from "@/features/projects/hooks/useProject";
import { useState } from "react";
import { handleProjectStepAction } from "@/hooks/dbData/project/utils/handleProjectStepAction";
import ButtonLabel from "@/components/buttons/_ButtonLabel";
import InputField from "@/components/displayElements/InputField";
import ModalLayout from "@/components/modals/_ModalLayout";

type Props = {
  project: Project;
  onClose: () => void;
  initialStatus?: ProjectStatus;
  onStatusChange?: (newStatus: ProjectStatus) => void;
};

const AdminModal = ({ project, onClose, onStatusChange }: Props) => {
  const [status, setStatus] = useState<ProjectStatus>(
    project.status as ProjectStatus
  );
  const [maxSupply, setMaxSupply] = useState<number>(200);
  const [usdcPrice, setUsdcPrice] = useState<number>(500);
  const [collectionName, setCollectionName] =
    useState<string>("Awesome Collection");
  const currentStepIndex = projectSteps.findIndex(
    (step) => step.key === status
  );

  const { approveProject, startNftMintRound, startIncubation } = useProject();

  const handleNext = async () => {
    const current = status;
    const currentStepIndex = projectSteps.findIndex((s) => s.key === current);
    if (currentStepIndex >= projectSteps.length - 1) return;

    let updateFun = approveProject;
    let params: any = {};

    switch (current) {
      case ProjectStatus.WaitingForApproval:
        updateFun = approveProject;
        break;
      case ProjectStatus.Published:
        updateFun = startNftMintRound as any;
        params = {
          nftMaxSupply: maxSupply,
          nftUsdcPrice: usdcPrice,
          nftCollectionName: collectionName,
        };
        break;
      case ProjectStatus.NftMintRound:
        updateFun = startIncubation as any;
        params = {};
        break;
    }

    const result = await handleProjectStepAction(
      current,
      project,
      updateFun,
      params
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
        {project.status == ProjectStatus.Published && (
          <>
            <InputField
              type="number"
              label="NFT Max Supply"
              value={maxSupply}
              onChange={(e) => setMaxSupply(Number(e.target.value))}
              placeholder="Enter the max supply"
            />
            <InputField
              type="number"
              label="NFT USDC Price"
              value={usdcPrice}
              onChange={(e) => setUsdcPrice(Number(e.target.value))}
              placeholder="Enter the price in USDC"
            />
            <InputField
              type="text"
              label=" Collection Name"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
              placeholder="Enter the collection name"
            />
          </>
        )}
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
