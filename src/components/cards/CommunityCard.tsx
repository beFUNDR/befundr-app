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
      className="aspect-square bg-custom-gray-900 border border-custom-gray-800 rounded-3xl flex flex-col items-center justify-center p-6 min-h-[200px] max-w-xs w-full shadow-md hover:border-custom-gray-600"
    >
      <Image
        src={collection.image}
        alt={collection.name + " logo"}
        width={100}
        height={100}
        className="rounded-full mb-4"
      />
      <h3 className="h3Style mb-2">{collection.name}</h3>
      <p className="bodyStyle  text-center line-clamp-2">
        {collection.description}
      </p>
    </Link>
  );
};

export default CommunityCard;
