import MissionCard from "../cards/MissionCard";

type Props = {};

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
    <div className="space-y-8 h-[500px] overflow-y-auto px-2">
      {missions.map((mission) => (
        <MissionCard key={mission.id} mission={mission} />
      ))}
    </div>
  );
};

export default MissionContent;
