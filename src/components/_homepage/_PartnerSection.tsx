"use client";
import CommunityCard from "../cards/CommunityCard";
import PartnerCard from "../cards/PartnerCard";
import { AnimatedBlock } from "../displayElements/AnimatedBlock";
import { useGetAllCollections } from "@/hooks/dbData/useCollection";
import { useGetAllPartners } from "@/hooks/dbData/usePartner";

const PartnerSection = () => {
  const { data: collections } = useGetAllCollections();
  const { data: partners } = useGetAllPartners();

  if (!collections) return null;

  return (
    <AnimatedBlock className="relative flex flex-col w-full mt-8 overflow-hidden">
      <div className="container mx-auto flex flex-col gap-6 py-16 px-4 relative z-10">
        <h1 className="h1Style">
          Support <strong className="text-accent">trusted</strong>
          people
        </h1>
        <p className="bodyStyle">
          An incubator where trust is a mechanism, not a bottleneck
          <br />
          Communities are the ones who make it possible
        </p>
        <div className="flex flex-row gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent py-2">
          {collections?.map((collection, idx) => (
            <CommunityCard key={idx} collection={collection.data} />
          ))}
        </div>
        <h1 className="h1Style mt-10">
          Supported by{" "}
          <strong className="text-accent">leading web3 players</strong>
        </h1>
        <p className="bodyStyle">
          From web3 DAOs, to VCs ; from technical to legal or marketing partners
        </p>
        <h2 className="h2Style mt-6">Partners</h2>
        <div className="flex flex-row gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[#222] scrollbar-track-transparent py-2">
          {partners?.map((partner, idx) => (
            <PartnerCard key={idx} partner={partner.data} />
          ))}
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default PartnerSection;
