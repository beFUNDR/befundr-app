"use client";
import CommunityCard from "@/components/cards/CommunityCard";
import Loader from "@/components/displayElements/Loader";
import { useGetAllCollections } from "@/features/nftItems/hooks/useCollection";

const CommunitiesPage = () => {
  const {
    data: communities,
    isLoading: isLoadingCommunities,
    error: communitiesError,
  } = useGetAllCollections();

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 ">
      <h1 className="h1Style my-6">The communities we trust</h1>
      <p className="bodyStyle max-w-xl mb-10">
        beFUNDR relies on the best Solana communities to find the best projects
        to fund.
      </p>

      {/* Communities list */}
      {isLoadingCommunities ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : communitiesError ? (
        <div className="text-red-500">Error loading communities</div>
      ) : (
        <div
          className="grid gap-8  w-full justify-center "
          style={{
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(300px, 100%), 300px))",
          }} // handle automatic number of column in responsive
        >
          {communities?.map((community: any, idx: number) => (
            <CommunityCard key={idx} collection={community.data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunitiesPage;
