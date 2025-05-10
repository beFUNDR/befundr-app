import Image from "next/image";

type Community = {
  name: string;
  description: string;
  logo: string;
};

const CommunityCard = ({ community }: { community: Community }) => {
  return (
    <div className="aspect-square bg-custom-gray-800 rounded-3xl flex flex-col items-center justify-center p-6 min-h-[260px] max-w-xs w-full shadow-md">
      <Image
        src={community.logo}
        alt={community.name + " logo"}
        width={100}
        height={100}
        className="rounded-full mb-4"
      />
      <h3 className="h3Style mb-2">{community.name}</h3>
      <p className="bodyStyle  text-center">{community.description}</p>
    </div>
  );
};

export default CommunityCard;
