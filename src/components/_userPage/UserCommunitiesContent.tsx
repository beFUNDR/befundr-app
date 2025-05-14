"use client";
import { useGetAllCollections } from "@/hooks/dbData/useCollection";
import Loader from "../displayElements/Loader";
import CommunityCard from "../cards/CommunityCard";

const UserCommunitiesContent = () => {
  const { data: collections, isLoading, error } = useGetAllCollections();
  return (
    <div className="w-fullgrid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
      {/* Communities list */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-red-500">Error loading communities</div>
      ) : (
        <div
          className="grid gap-8  w-full justify-center "
          style={{
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(300px, 100%), 300px))",
          }} // handle automatic number of column in responsive
        >
          {collections?.map((collection: any, idx: number) => (
            <CommunityCard key={idx} collection={collection.data} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserCommunitiesContent;
