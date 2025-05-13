import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import MissionCard from "../cards/MissionCard";

type Props = {
  isOwner: boolean;
};

const MissionContent = (props: Props) => {
  // Mock of two missions (in English)
  const missions: Mission[] = [
    {
      id: "1",
      title: "Looking for a front-end developer",
      category: "Development",
      description:
        "We need help to improve the user interface of our dashboard.",
      isPaid: true,
    },
    {
      id: "2",
      title: "Need a community manager",
      category: "Communication",
      description: "Help us engage our community on Discord and Twitter.",
      isPaid: false,
    },
  ];

  return (
    <div className="w-2/3 mx-auto flex flex-col justify-start items-center space-y-8 h-[500px] overflow-y-auto px-2">
      {props.isOwner && (
        <button className="w-40">
          <ButtonLabelSecondary label="Add a mission" />
        </button>
      )}
      {missions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
};

export default MissionContent;
