import Image from "next/image";

type Props = {
  community: string;
};

const CommunityLogo = ({ community }: Props) => {
  const fileName = community.toLowerCase().replace(/\s+/g, "") + ".png";
  const src = `/images/communities/${fileName}`;

  return (
    <Image src={src} alt={community + " logo"} fill className="rounded-full" />
  );
};

export default CommunityLogo;
