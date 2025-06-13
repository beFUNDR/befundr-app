import { Ban, Pencil, RefreshCcw, Trash } from "lucide-react";
import ButtonLabelSecondarySmall from "../buttons/_ButtonLabelSecondarySmall";
import { useUser } from "@/hooks/dbData/useUser";
import Image from "next/image";
import Link from "next/link";
import DefaultAvatar from "../displayElements/DefaultAvatar";
import { useState } from "react";
import EditMissionModal from "../modals/EditMissionModal";
import DeleteMissionModal from "../modals/DeleteMissionModal";

type Props = {
  mission: Mission;
  isOwner: boolean;
  missionId: string;
};

const MissionCard = ({ mission, isOwner, missionId }: Props) => {
  const { data: user } = useUser(mission.doneBy);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="bg-custom-gray-900 rounded-2xl p-6 flex flex-col items-center justify-between gap-4 border border-custom-gray-800 w-full md:max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 flex-1 w-full ">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mb-1 w-full">
          <span className="h3Style leading-tight w-full">{mission.title}</span>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs ">
              {mission.skill}
            </span>
            {isOwner && (
              <>
                <button
                  className="text-custom-gray-400 text-sm hover:text-white transition-colors duration-300"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  <Pencil size={18} />
                </button>
                <button
                  className="text-custom-gray-400 text-sm hover:text-red-500 transition-colors duration-300"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  <Trash size={18} />
                </button>
              </>
            )}
          </div>
        </div>
        <div className="bodyStyle mb-2 whitespace-pre-line">
          {mission.description}
        </div>
        <div className="flex justify-between items-center w-full gap-2 mt-2">
          {mission.isPaid ? (
            <span className="text-secondary font-semibold text-sm bg-secondary/20 px-2 py-0.5 rounded-full">
              Paid
            </span>
          ) : (
            <span className="text-custom-gray-400 font-semibold text-sm bg-custom-gray-800 px-2 py-0.5 rounded-full">
              Volunteer
            </span>
          )}
          {mission.status === "open" && (
            <span className="text-custom-gray-400 font-semibold text-sm bg-custom-gray-800 px-2 py-0.5 rounded-full">
              {mission.applicants.length} applicant
              {mission.applicants.length > 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>
      {mission.status === "open" && (
        <button className="w-full md:w-1/3">
          <ButtonLabelSecondarySmall label="Apply" />
        </button>
      )}
      {mission.status === "onGoing" && (
        <div className="flex flex-col justify-center items-center gap-2">
          <RefreshCcw className="text-custom-gray-400" size={40} />
          <span className="bodyStyle">On going</span>
        </div>
      )}
      {mission.status === "done" && (
        <Link
          href={`/skillshub/${user?.wallet}`}
          className="flex justify-start items-center gap-4 "
        >
          {user?.avatar ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <DefaultAvatar size={12} publicKey={user?.wallet} />
          )}
          <div>
            <div className="text-xs text-gray-400">Done by</div>
            <div className="font-bold text-white">{user?.name}</div>
          </div>
        </Link>
      )}
      {mission.status === "cancelled" && (
        <div className="flex flex-col justify-center items-center gap-2">
          <Ban className="text-red-600" size={40} />
          <span className="bodyStyle">Cancelled</span>
        </div>
      )}
      {isEditModalOpen && (
        <EditMissionModal
          missionId={missionId}
          projectId={mission.projectId}
          mission={mission}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteMissionModal
          missionId={missionId}
          projectId={mission.projectId}
          onClose={() => setIsDeleteModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MissionCard;
