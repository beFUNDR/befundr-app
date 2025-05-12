import ButtonLabelSecondarySmall from "../buttons/_ButtonLabelSecondarySmall";

type Props = {
  mission: Mission;
};

const MissionCard = ({ mission }: Props) => {
  return (
    <div className="bg-custom-gray-900 rounded-2xl p-6 flex items-center justify-between gap-4 border border-[#232428] max-w-2xl mx-auto">
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-3 mb-1">
          <span className="h3Style leading-tight">{mission.title}</span>
          <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs ">
            {mission.category}
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
      <button>
        <ButtonLabelSecondarySmall label="Apply" />
      </button>
    </div>
  );
};

export default MissionCard;
