"use client";
import PartnerCard from "@/components/cards/PartnerCard";
import Loader from "@/components/displayElements/Loader";
import { useGetAllPartners } from "@/hooks/dbData/usePartner";
import Link from "next/link";

const PartnersPage = () => {
  const {
    data: partners,
    isLoading: isLoadingPartners,
    error: partnersError,
  } = useGetAllPartners();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 ">
      <h1 className="h1Style my-6">Our trusted partners</h1>
      <p className="bodyStyle max-w-xl mb-10">
        beFUNDR works with the best partners to support and fund innovative
        projects.
      </p>

      {/* Partners list */}
      {isLoadingPartners ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : partnersError ? (
        <div className="text-red-500">Error loading partners</div>
      ) : (
        <div
          className="grid gap-8  w-full justify-center "
          style={{
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(300px, 100%), 300px))",
          }}
        >
          {partners?.map((partner: any, idx: number) => (
            <Link href={`/partners/${partner.id}`} key={idx}>
              <PartnerCard partner={partner.data} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnersPage;
