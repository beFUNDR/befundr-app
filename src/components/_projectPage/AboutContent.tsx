import Image from "next/image";
import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import DefaultAvatar from "../displayElements/DefaultAvatar";

type Props = {
  description: string;
  owner: User;
  isOwner: boolean;
};

const AboutContent = ({ description, owner, isOwner }: Props) => {
  return (
    <div className="min-w-full mx-auto flex flex-col justify-start items-center space-y-8 ">
      {isOwner && (
        <button className="w-40">
          <ButtonLabelSecondary label="Edit" />
        </button>
      )}
      {/* About section */}
      <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-2 justify-start items-start  w-3xl">
        <h2 className="text-xl font-bold text-white mb-2">
          Project description
        </h2>
        <p className="text-gray-300 mb-6">{description}</p>
        <p className="text-gray-300 mb-6">{description}</p>
        <p className="text-gray-300 mb-6">{description}</p>
        <h2 className="text-xl font-bold text-white mb-2">Team</h2>
        <div className="flex flex-col justify-start items-center gap-2">
          {owner &&
            (owner.avatar ? (
              <Image
                src={owner.avatar}
                alt={owner.name}
                width={96}
                height={96}
                className="object-cover rounded-full"
              />
            ) : (
              <DefaultAvatar size={24} publicKey={owner.wallet} />
            ))}
          <p className="bodyStyle mb-6">{owner.name}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
