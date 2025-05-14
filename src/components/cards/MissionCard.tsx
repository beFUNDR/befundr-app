import { Ban, RefreshCcw } from "lucide-react";
import ButtonLabelSecondarySmall from "../buttons/_ButtonLabelSecondarySmall";
import { useUser } from "@/hooks/dbData/useUser";
import Image from "next/image";
import Link from "next/link";
import DefaultAvatar from "../displayElements/DefaultAvatar";
type Props = {
  mission: Mission;
};

const MissionCard = ({ mission }: Props) => {
  const { data: user } = useUser(mission.doneBy);

  return (
    <div className="bg-custom-gray-900 rounded-2xl p-6 flex items-center justify-between gap-4 border border-custom-gray-800 w-full max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="h3Style leading-tight">{mission.title}</span>
          <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs ">
            {mission.skill}
          </span>
        </div>
        <div className="bodyStyle mb-2">{mission.description}</div>
        <div className="flex items-center gap-2 mt-2">
          {mission.isPaid ? (
            <span className="text-secondary font-semibold text-sm bg-secondary/20 px-2 py-0.5 rounded-full">
              Paid
            </span>
          ) : (
            <span className="text-custom-gray-400 font-semibold text-sm bg-custom-gray-800 px-2 py-0.5 rounded-full">
              Volunteer
            </span>
          )}
        </div>
      </div>
      {mission.status === "open" && (
        <button>
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
            <div className="font-bold text-white">{user.name}</div>
          </div>
        </Link>
      )}
      {mission.status === "cancelled" && (
        <div className="flex flex-col justify-center items-center gap-2">
          <Ban className="text-red-600" size={40} />
          <span className="bodyStyle">Cancelled</span>
        </div>
      )}
    </div>
  );
};

export default MissionCard;
