import ButtonLabelSecondarySmall from "@/components/buttons/_ButtonLabelSecondarySmall";
import Divider from "@/components/displayElements/Divider";
import CategoryTag from "@/components/tags/CategoryTag";
import { Mission } from "@/features/missions";
import { useProject } from "@/features/projects/hooks";
import Image from "next/image";

type Props = {
  mission: Mission;
  missionId: string;
  projectId: string;
};

const MissionCardFromHub = ({ mission, missionId, projectId }: Props) => {
  const { useGetProjectById } = useProject();
  const { data: project, isLoading: isProjectLoading } =
    useGetProjectById(projectId);

  return (
    <div className="bg-custom-gray-900 rounded-2xl p-4 flex flex-col items-center justify-between gap-4 border border-custom-gray-800 min-w-[160px] md:w-[200px] min-h-[280px] md:min-h-[300px]">
      <div className="flex flex-col gap-2 flex-1 w-full ">
        {/* main info */}
        <div className="flex flex-col items-start gap-3  w-full">
          <span className="h3Style leading-tight w-full">{mission.title}</span>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 w-full">
            <span className="px-2 py-0.5 rounded-full bg-accent/20 text-accent text-xs ">
              {mission.skill}
            </span>
            {mission.isPaid ? (
              <span className="text-secondary  text-xs bg-secondary/20 px-2 py-0.5 rounded-full">
                Paid
              </span>
            ) : (
              <span className="text-custom-gray-400  text-xs bg-custom-gray-800 px-2 py-0.5 rounded-full">
                Volunteer
              </span>
            )}
          </div>
        </div>
        <Divider />
        {/* project info */}
        <div className="flex flex-col items-start gap-2 w-full ">
          <div className="flex items-center gap-2">
            {project?.data.logo && (
              <Image
                src={project?.data.logo}
                alt={project?.data.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="h4Style  w-full">{project?.data.name}</span>
          </div>
          {project?.data.category && (
            <CategoryTag category={project?.data.category} />
          )}
        </div>
        <Divider />
        {/* button */}
        <a
          href={`/project/${projectId}?tab=missionHub`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <ButtonLabelSecondarySmall label="See details" />
        </a>
      </div>
    </div>
  );
};

export default MissionCardFromHub;
