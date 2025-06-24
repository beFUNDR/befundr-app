import { skills } from "@/shared/constants/skills";

type Props = {
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
};

const SkillsFilter = ({ selectedSkill, setSelectedSkill }: Props) => {
  return (
    <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
      <button
        className={`min-w-20 py-2 rounded-full border text-sm font-semibold transition ${
          !selectedSkill
            ? "text-accent border-accent"
            : " text-custom-gray-400 border-custom-gray-400 hover:text-custom-gray-200 hover:border-custom-gray-200 "
        }`}
        onClick={() => setSelectedSkill(null)}
      >
        All
      </button>
      {skills.map((skill) => (
        <button
          key={skill}
          className={`px-4 py-2 rounded-full border text-sm font-semibold transition whitespace-nowrap ${
            selectedSkill === skill
              ? "text-accent border-accent"
              : " text-custom-gray-400 border-custom-gray-400 hover:text-custom-gray-200 hover:border-custom-gray-200 "
          }`}
          onClick={() => setSelectedSkill(skill)}
        >
          {skill}
        </button>
      ))}
    </div>
  );
};

export default SkillsFilter;
