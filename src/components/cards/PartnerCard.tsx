import Image from "next/image";

type Partner = {
  name: string;
  description: string;
  logo: string;
};

const PartnerCard = ({ partner }: { partner: Partner }) => {
  return (
    <div className="aspect-square bg-custom-gray-800 rounded-3xl flex flex-col items-center justify-center p-6  max-w-xs w-full shadow-md">
      <Image
        src={partner.logo}
        alt={partner.name + " logo"}
        width={100}
        height={100}
        className="rounded-full mb-4"
      />
      <h3 className="h3Style mb-2">{partner.name}</h3>
      <p className="bodyStyle text-center">{partner.description}</p>
    </div>
  );
};

export default PartnerCard;
