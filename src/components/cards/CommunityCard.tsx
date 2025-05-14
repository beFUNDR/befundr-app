import Image from "next/image";
import Link from "next/link";

type Collection = {
  name: string;
  description: string;
  image: string;
};

const CommunityCard = ({ collection }: { collection: Collection }) => {
  return (
    <Link
      href={`/communities/${collection.name}`}
      className="aspect-square bg-custom-gray-900 border border-custom-gray-800 rounded-3xl flex flex-col items-center justify-center p-6 h-[300px] w-[300px] max-w-xs  shadow-md hover:border-custom-gray-600"
    >
      <Image
        src={collection.image}
        alt={collection.name + " logo"}
        width={100}
        height={100}
        className="rounded-full mb-4 aspect-square object-cover"
      />
      <h3 className="h3Style mb-2">{collection.name}</h3>
      <p className="bodyStyle  text-center line-clamp-1">
        {collection.description}
      </p>
    </Link>
  );
};

export default CommunityCard;
