import { useMission } from "@/hooks/dbData/useMission";
import MissionCard from "../cards/MissionCard";
import LoaderSmall from "../displayElements/LoaderSmall";

const mockContributions = [
  {
    title: "Helped launch the MonkeDAO website",
    description: "Worked on the front-end and smart contract integration.",
    date: "2023-11-01",
  },
  {
    title: "Organized a community event",
    description: "Set up a virtual hackathon for DAO members.",
    date: "2023-09-15",
  },
  {
    title: "Wrote a technical article",
    description: "Published a guide on Solana staking.",
    date: "2023-08-10",
  },
];

const UserMissionsContent = ({ userId }: { userId: string }) => {
  const { useMissionsByDoneByUserId } = useMission();
  const {
    data: missions,
    isLoading,
    error,
  } = useMissionsByDoneByUserId(userId);

  if (isLoading) return <LoaderSmall />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col gap-6 mt-4">
      {missions?.map((mission, idx) => (
        <MissionCard
          key={idx}
          mission={mission.data}
          isOwner={false}
          missionId={mission.id}
          projectId={mission.data.projectId}
        />
      ))}
    </div>
  );
};

export default UserMissionsContent;
