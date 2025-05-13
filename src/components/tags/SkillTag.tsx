type Props = {
  skill: string;
};

const SkillTag = ({ skill }: Props) => {
  return (
    <span
      key={skill}
      className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-semibold bg-custom-gray-800 text-custom-gray-200 border-custom-gray-200`}
    >
      {skill}
    </span>
  );
};

export default SkillTag;
