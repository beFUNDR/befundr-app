"use client";
import { useMission } from "@/hooks/dbData/useMission";
import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import MissionCard from "../cards/MissionCard";
import { useState } from "react";
import CreateMissionModal from "../modals/CreateMissionModal";

type Props = {
  isOwner: boolean;
  projectId: string;
};

const MissionContent = (props: Props) => {
  const { useGetMissionsByProjectId } = useMission();
  const {
    data: missions,
    isLoading,
    error,
  } = useGetMissionsByProjectId(props.projectId);

  const [isShowModal, setIsShowModal] = useState(false);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full md:w-2/3 mx-auto flex flex-col justify-start items-center space-y-8 h-[500px] overflow-y-auto  ">
      {props.isOwner && (
        <button className="w-40" onClick={() => setIsShowModal(true)}>
          <ButtonLabelSecondary label="Add a mission" />
        </button>
      )}
      {missions?.map((mission, index) => (
        <MissionCard
          key={index}
          mission={mission.data}
          isOwner={props.isOwner}
          missionId={mission.id}
          projectId={props.projectId}
        />
      ))}
      {isShowModal && (
        <CreateMissionModal
          open={isShowModal}
          onClose={() => setIsShowModal(false)}
          projectId={props.projectId}
        />
      )}
    </div>
  );
};

export default MissionContent;
