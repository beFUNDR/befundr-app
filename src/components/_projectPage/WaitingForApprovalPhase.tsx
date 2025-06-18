import MainProjectInfos from "@/components/_projectPage/MainProjectInfos";
import StatusTag from "@/components/tags/StatusTag";
import { User } from "@/features/users/types";

type Props = { project: Project; owner: User };

const WaitingForApprovalPhase = (props: Props) => {
  return (
    <div className="flex-1 flex flex-col justify-between gap-2 bg-black/70 rounded-2xl p-4 md:p-8 border border-custom-gray-600 min-w-[350px]">
      {/* Title */}
      <div className="flex justify-between items-center gap-2">
        <p className="h3Style">Project is in review</p>
        <StatusTag status={props.project.status} />
      </div>
      <p className="bodyStyle -mt-2">
        beFUNDR is reviewing the project to ensure it meets our guidelines.
      </p>
      <MainProjectInfos project={props.project} owner={props.owner} />
    </div>
  );
};

export default WaitingForApprovalPhase;
