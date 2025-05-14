"use client";
import { useGetAllCollections } from "@/hooks/dbData/useCollection";
import Image from "next/image";

type Props = {
  collectionName: string;
};

const CommunityLogo = ({ collectionName }: Props) => {
  const { data: collections } = useGetAllCollections();
  const community = collections?.find(
    (collection) =>
      collection.data.name.toLowerCase() === collectionName.toLowerCase()
  );

  if (community?.data.image)
    return (
      <Image
        src={community?.data.image}
        alt={community?.data.name + " logo"}
        fill
        className="rounded-full aspect-square object-cover"
      />
    );
};

export default CommunityLogo;
