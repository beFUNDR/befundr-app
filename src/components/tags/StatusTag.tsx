import { projectSteps } from "@/data/ProjectStatus";

type Props = {
  status: string;
};

const StatusTag = ({ status }: Props) => {
  const statusToDisplay = projectSteps.find((step) => step.key === status);
  return (
    <span className="ml-2 px-3 py-1 bg-black/50 rounded-full border border-custom-gray-200 text-custom-gray-200 text-sm flex items-center gap-1">
      {statusToDisplay?.label}
    </span>
  );
};

export default StatusTag;
