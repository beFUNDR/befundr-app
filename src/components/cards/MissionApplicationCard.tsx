"use client";

import { useMission } from "@/hooks/dbData/useMission";
import LoaderSmall from "../displayElements/LoaderSmall";
import { useProject } from "@/hooks/dbData/project/useProject";
import Image from "next/image";
import MissionStatusTag from "../tags/MissionStatusTag";
import Link from "next/link";
import ButtonLabelSecondarySmall from "../buttons/_ButtonLabelSecondarySmall";
import ButtonLabelAlertSmall from "../buttons/_ButtonLabelAlertSmall";
import { useState } from "react";
import CancelMissionApplicationModal from "../modals/CancelMissionApplicationModal";

type Props = {
  application: MissionApplication;
  applicationId: string;
};

const MissionApplicationCard = ({ application, applicationId }: Props) => {
  const { useGetMissionById } = useMission();
  const { useGetProjectById } = useProject();
  const { data: mission, isLoading: isMissionLoading } = useGetMissionById(
    application.missionId
  );
  const { data: project, isLoading: isProjectLoading } = useGetProjectById(
    mission?.data.projectId || ""
  );

  const [isShowCancelModal, setIsShowCancelModal] = useState(false);

  if (isMissionLoading || isProjectLoading)
    return (
      <div className="bg-custom-gray-900 rounded-2xl p-6 flex flex-col items-center justify-between gap-4 border border-custom-gray-800 w-full md:max-w-2xl mx-auto">
        <div className="flex flex-col gap-2 flex-1 w-full items-center justify-center">
          <LoaderSmall color="white" />
        </div>
      </div>
    );

  return (
    <div className="bg-custom-gray-900 rounded-2xl p-6 flex flex-col items-center justify-between gap-4 border border-custom-gray-800 w-full md:max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 flex-1 w-full ">
        <div className="flex justify-start items-center gap-2">
          <Image
            src={project?.data.logo || ""}
            alt={project?.data.name || ""}
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="h4Style ">{project?.data.name}</p>
        </div>
        <p className="bodyStyle">{mission?.data.title}</p>
        <MissionStatusTag status={application.status} />
        <Link href={`/project/${mission?.data.projectId}`}>
          <ButtonLabelSecondarySmall label="See project" />
        </Link>
        <button className="w-full" onClick={() => setIsShowCancelModal(true)}>
          <ButtonLabelAlertSmall label="Remove application" />
        </button>
      </div>
      {isShowCancelModal && (
        <CancelMissionApplicationModal
          onClose={() => setIsShowCancelModal(false)}
          applicationId={applicationId}
          missionId={application.missionId}
          userId={application.userId}
        />
      )}
    </div>
  );
};

export default MissionApplicationCard;
