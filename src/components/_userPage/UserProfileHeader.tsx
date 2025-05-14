import Image from "next/image";
import SkillTag from "../tags/SkillTag";
import XButton from "../buttons/XButton";
import DiscordButton from "../buttons/DiscordButton";
import TelegramButton from "../buttons/TelegramButton";
import InternetButton from "../buttons/InternetButton";
import PointCard from "../cards/PointCard";
import DefaultAvatar from "../displayElements/DefaultAvatar";

interface UserProfileHeaderProps {
  user: User;
  gameProgramData: GameProgram;
}

const UserProfileHeader = ({
  user,
  gameProgramData,
}: UserProfileHeaderProps) => {
  // Mock des données manquantes
  const points = (user as any).points ?? 50;
  const roles: string[] = (user as any).roles ?? ["Superteam member"];
  const since = (user as any).since ?? 2021;
  const contributions = (user as any).contributions ?? 10;
  const daos = (user as any).daos ?? 4;
  const projects = (user as any).projects ?? 1;

  console.log(user);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center mb-8 w-full">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.name}
            width={220}
            height={220}
            className="rounded-2xl border-4 border-custom-gray-800 bg-black"
          />
        ) : (
          <DefaultAvatar size={40} publicKey={user.wallet} />
        )}
      </div>
      {/* Infos */}
      <div className="flex-1 flex flex-col gap-2 items-start justify-center">
        <div className="flex items-center gap-3">
          <h1 className="h1Style">{user.name}</h1>
        </div>
        {/* skills */}
        <div className="flex items-center gap-2 mt-2">
          {user.skills.map((skill: string, idx: number) => (
            <SkillTag key={idx} skill={skill} />
          ))}
        </div>
        <div className="bodyStyle mt-2">{user.bio}</div>
        <div className="flex gap-8 mt-4 text-white text-lg">
          <div className="flex flex-col items-center">
            <span className="font-bold text-2xl">{contributions}</span>
            <span className="text-xs text-gray-400">contributions</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-2xl">{daos}</span>
            <span className="text-xs text-gray-400">DAOs</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-2xl">{projects}</span>
            <span className="text-xs text-gray-400">Projects</span>
          </div>
        </div>
        {/* Socials */}
        <div className="flex gap-4 mt-4">
          {user.twitter && <XButton href={`https://x.com/${user.twitter}`} />}
          {user.discord && (
            <DiscordButton href={`https://discord.com/users/${user.discord}`} />
          )}
          {user.telegram && (
            <TelegramButton href={`https://t.me/${user.telegram}`} />
          )}
          {user.website && <InternetButton href={user.website} />}
        </div>
      </div>
      {/* Points */}
      <PointCard points={gameProgramData.points} />
    </div>
  );
};

export default UserProfileHeader;
