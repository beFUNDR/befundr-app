import StatusTag from "@/components/tags/StatusTag";
import MainProjectInfos from "./MainProjectInfos";

type Props = { project: Project; owner: User };

const PublishedPhase = (props: Props) => {
  return (
    <div className=" flex flex-col justify-between gap-2 bg-black/70 rounded-2xl p-4 md:p-8 border border-custom-gray-600 min-w-[350px] aspect-square">
      {/* Title */}
      <div className="flex justify-between items-center gap-2">
        <p className="h3Style">Project selected</p>
        <StatusTag status={props.project.status} />
      </div>
      <p className="bodyStyle -mt-2">
        This project has been selected by beFUNDR to integrate the next
        incubation batch.
        <br /> Stay tuned for updates!
      </p>
      <MainProjectInfos project={props.project} owner={props.owner} />
    </div>
  );
};

export default PublishedPhase;
