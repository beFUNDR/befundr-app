import { ProjectStatus, projectSteps } from "@/data/ProjectStatus";
import { useState } from "react";

type Props = {
  onClose: () => void;
  initialStatus?: ProjectStatus;
  onStatusChange?: (newStatus: ProjectStatus) => void;
};

const AdminModal = ({
  onClose,
  initialStatus = ProjectStatus.WaitingForApproval,
  onStatusChange,
}: Props) => {
  const [status, setStatus] = useState<ProjectStatus>(initialStatus);
  const currentStepIndex = projectSteps.findIndex((step) => step.key === status);

  const handleNext = () => {

    if (currentStepIndex < projectSteps.length - 1) {
      const nextStatus = projectSteps[currentStepIndex + 1].key;
      setStatus(nextStatus);
      onStatusChange?.(nextStatus);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-black rounded-xl shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Project status</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">&times;</button>
        </div>

        <p className="mb-6">
          <span className="font-semibold">Current Status:</span>{" "}
          <span className="text-blue-600">{status}</span>
        </p>

        <div className="flex items-center overflow-x-auto pb-4">
          {projectSteps.map(({ key, label }, idx) => {
            const isActive = idx === currentStepIndex;
            const isCompleted = idx < currentStepIndex;

            return (
              <div key={key} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
      ${isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-blue-600 text-white' :
                        'bg-gray-300 text-gray-600'}`}>
                    {idx + 1}
                  </div>
                  <div className="absolute mt-10 text-xs text-center w-12">{label}</div>
                </div>

                {idx < projectSteps.length - 1 && (
                  <div className="w-8 h-1 bg-gray-300 mx-1"></div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleNext}
            disabled={!projectSteps[currentStepIndex]?.nextAction}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {projectSteps[currentStepIndex]?.nextAction ?? "No action possible"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;
