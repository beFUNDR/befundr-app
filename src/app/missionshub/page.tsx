"use client";
import MissionCardFromHub from "@/components/cards/MissionCardFromHub";
import Loader from "@/components/displayElements/Loader";
import { useMission } from "@/hooks/dbData/useMission";
import SkillsFilter from "@/shared/components/SkillsFilter";
import { useMemo, useState } from "react";

const MissionsHubPage = () => {
  const { useGetAllMissions } = useMission();
  const {
    data: missions,
    isLoading: isLoadingMissions,
    error: missionsError,
  } = useGetAllMissions();

  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [onlyPaidMissions, setOnlyPaidMissions] = useState(false);

  // Filter missions by selected skill and paid status
  const filteredMissions = useMemo(
    () =>
      missions
        ? missions.filter(
            (mission) =>
              // show only open missions
              mission.data.status === "open" &&
              // if skill is selected, show only missions with this skill
              (!selectedSkill || mission.data.skill === selectedSkill) &&
              // if only paid missions are selected, show only paid missions
              (!onlyPaidMissions || mission.data.isPaid)
          )
        : [],
    [missions, selectedSkill, onlyPaidMissions]
  );

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
      <h1 className="h1Style my-6">Contribute to projects</h1>
      <p className="bodyStyle max-w-xl mb-10">
        The incubation process on beFUNDR is community-driven. You can find
        bellow all the needs of the incubated projects. <br />
        You have the right skills? Just apply to the mission and help the
        project grow.
      </p>
      <SkillsFilter
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
      />
      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={onlyPaidMissions}
          onChange={() => setOnlyPaidMissions(!onlyPaidMissions)}
          className="w-4 h-4 accent-accent border-custom-gray-800 rounded-full"
        />
        <label htmlFor="onlyPaidMissions">Show only paid missions</label>
      </div>
      {isLoadingMissions ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : missionsError ? (
        <div className="text-red-500">
          Erreur lors du chargement des missions
        </div>
      ) : (
        <div
          className="grid gap-4 md:gap-8 w-full justify-items-center"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
          }}
        >
          {filteredMissions.map((mission, idx) => (
            <MissionCardFromHub
              key={idx}
              mission={mission.data}
              missionId={mission.id}
              projectId={mission.data.projectId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MissionsHubPage;
