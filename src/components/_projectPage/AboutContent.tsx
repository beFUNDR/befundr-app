import UserCard from "../cards/UserCard";

type Props = {
  description: string;
  owner: User;
};

const AboutContent = ({ description, owner }: Props) => {
  return (
    <div className="space-y-8">
      {/* About section */}
      <div className="h-[500px] overflow-y-auto px-2 flex flex-col gap-2 justify-start items-start">
        <h2 className="text-xl font-bold text-white mb-2">
          Project description
        </h2>
        <p className="text-gray-300 mb-6">{description}</p>
        <p className="text-gray-300 mb-6">{description}</p>
        <p className="text-gray-300 mb-6">{description}</p>
        <h2 className="text-xl font-bold text-white mb-2">Team</h2>
        {owner && <UserCard user={owner} />}
      </div>
    </div>
  );
};

export default AboutContent;
