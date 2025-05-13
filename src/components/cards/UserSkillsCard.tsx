import Image from "next/image";
import SkillTag from "../tags/SkillTag";

type Props = {
  user: User;
};

const skillColors: Record<string, string> = {
  "Biz Dev": "bg-blue-900 text-blue-300 border-blue-400",
  "Growth Marketing": "bg-green-900 text-green-300 border-green-400",
  "Project Management": "bg-yellow-900 text-yellow-300 border-yellow-400",
  "Treasury Management": "bg-green-900 text-green-300 border-green-400",
  Dev: "bg-purple-900 text-purple-300 border-purple-400",
  Investor: "bg-red-900 text-red-300 border-red-400",
  "Community Management": "bg-orange-900 text-orange-300 border-orange-400",
  Design: "bg-pink-900 text-pink-300 border-pink-400",
  "Content Creation": "bg-blue-900 text-blue-300 border-blue-400",

  // Ajoute d'autres skills ici si besoin
};

const UserSkillCard = ({ user }: Props) => {
  const maxSkills = 3;
  const displayedSkills = user.skills?.slice(0, maxSkills);
  const extraSkills = user.skills?.length - maxSkills;

  return (
    <div className="bg-custom-gray-900 rounded-2xl p-2 flex flex-col items-center justify-between gap-3 border border-custom-gray-800 hover:border-custom-gray-400 max-w-xs mx-auto shadow-lg w-[200px] h-[300px] transition-all duration-300">
      <div className="w-24 h-24 rounded-full border-4 border-custom-gray-800 overflow-hidden mb-2">
        {user.avatar && (
          <Image
            src={user.avatar}
            alt={user.name}
            width={96}
            height={96}
            className="object-cover"
          />
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{user.name}</div>
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {displayedSkills &&
            displayedSkills.map((skill, idx) => (
              <SkillTag key={idx} skill={skill} />
            ))}
          {extraSkills && extraSkills > 0 && (
            <span className="flex items-center justify-center px-3 py-1 rounded-full border border-custom-gray-200 bg-custom-gray-800 text-custom-gray-200 text-sm font-semibold">
              +{extraSkills}
            </span>
          )}
        </div>
        {/* See project link */}
        <p className="text-accent underline font-semibold text-base mb-2 w-fit">
          See profile →
        </p>
      </div>
    </div>
  );
};

export default UserSkillCard;
