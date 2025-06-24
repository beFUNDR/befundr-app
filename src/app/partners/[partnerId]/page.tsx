"use client";
import BackButton from "@/components/buttons/BackButton";
import DiscordButton from "@/components/buttons/DiscordButton";
import InternetButton from "@/components/buttons/InternetButton";
import TelegramButton from "@/components/buttons/TelegramButton";
import XButton from "@/components/buttons/XButton";
import Loader from "@/components/displayElements/Loader";
import SkillTag from "@/components/tags/SkillTag";
import { useGetPartnerById } from "@/hooks/dbData/usePartner";
import Image from "next/image";
import { useParams } from "next/navigation";

const PartnerDetailPage = () => {
  const params = useParams();
  const partnerId = params.partnerId as string;
  const { data: partner, isLoading, error } = useGetPartnerById(partnerId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen bodyStyle">
        Error: {error.message}
      </div>
    );

  if (!partner)
    return (
      <div className="flex justify-center items-center h-screen bodyStyle">
        Partner not found
      </div>
    );

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-6xl mx-auto px-4 py-12">
      <BackButton />
      <div className="flex flex-col md:flex-row gap-8 items-center mb-8 w-full">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {partner.data.logo && (
            <Image
              src={partner.data.logo}
              alt={partner.data.name}
              width={220}
              height={220}
              className="rounded-2xl border-4 border-custom-gray-800 bg-black"
            />
          )}
        </div>
        {/* Infos */}
        <div className="flex-1 flex flex-col gap-2 items-center md:items-start justify-center">
          <div className="flex items-center gap-3">
            <h1 className="h1Style">{partner.data.name}</h1>
          </div>
          {/* skills */}
          <div className="flex items-center gap-2 mt-2 flex-wrap justify-center md:justify-start">
            {partner.data.skills?.map((skill: string, idx: number) => (
              <SkillTag key={idx} skill={skill} />
            ))}
          </div>
          <div className="bodyStyle mt-2 whitespace-pre-line">
            {partner.data.description}
          </div>

          {/* Socials */}
          <div className="flex gap-2 md:gap-4 mt-4">
            {partner.data.twitter && (
              <XButton href={`https://x.com/${partner.data.twitter}`} />
            )}
            {partner.data.discord && (
              <DiscordButton
                href={`https://discord.com/users/${partner.data.discord}`}
              />
            )}
            {partner.data.telegram && (
              <TelegramButton href={`https://t.me/${partner.data.telegram}`} />
            )}
            {partner.data.website && (
              <InternetButton href={partner.data.website} />
            )}
          </div>
        </div>
      </div>
      {/* incubation role */}
      <h2 className="h2Style mt-8">Role at beFUNDR</h2>
      <div className="bodyStyle mt-2 whitespace-pre-line">
        {partner.data.incubationRole}
      </div>
    </div>
  );
};

export default PartnerDetailPage;
