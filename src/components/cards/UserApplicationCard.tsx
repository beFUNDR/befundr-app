import DefaultAvatar from "@/components/displayElements/DefaultAvatar";
import SkillTag from "@/components/tags/SkillTag";
import { User } from "@/features/users/types";
import Image from "next/image";

type Props = {
  user: User;
  application: MissionApplication;
  applicationId: string;
};

const UserApplicationCard = ({ user, application, applicationId }: Props) => {
  const maxSkills = 2;
  const displayedSkills = user.skills?.slice(0, maxSkills);
  const extraSkills = user.skills?.length - maxSkills;

  return (
    <div className="bg-custom-gray-900 rounded-2xl p-2 flex flex-col items-center justify-between md:gap-3 border border-custom-gray-800 hover:border-custom-gray-600 max-w-xs mx-auto shadow-lg min-w-[160px] md:w-[200px] h-[280px] md:h-[300px] transition-all duration-300">
      <div className="w-24 h-24 rounded-full border-4 border-custom-gray-800 overflow-hidden mb-2">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={96}
            height={96}
            className="object-cover"
          />
        ) : (
          <DefaultAvatar size={24} publicKey={user.wallet} />
        )}
      </div>
      <div className="h4Style md:h2Style font-bold text-white mb-1">
        {user.name}
      </div>
      <div className="flex flex-col items-center gap-2 w-full">
        <div className="flex flex-wrap justify-center gap-2 w-full">
          {displayedSkills &&
            displayedSkills.map((skill, idx) => (
              <SkillTag key={idx} skill={skill} />
            ))}
          {extraSkills > 0 && (
            <span className="flex items-center justify-center px-3 py-1 rounded-full border border-custom-gray-200 bg-custom-gray-800 text-custom-gray-200 text-sm font-semibold">
              +{extraSkills}
            </span>
          )}
        </div>
        {/* See project link */}
        <p className="text-accent underline font-semibold text-base mb-2 w-fit">
          View application →
        </p>
      </div>
    </div>
  );
};

export default UserApplicationCard;
