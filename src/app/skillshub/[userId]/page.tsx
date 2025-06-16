"use client";
import Loader from "@/components/displayElements/Loader";
import { useUser } from "@/hooks/dbData/useUser";
import { useParams } from "next/navigation";
import { useState } from "react";
import UserProfileHeader from "@/components/_userPage/UserProfileHeader";
import UserTabs from "@/components/_userPage/UserTabs";
import UserCommunitiesContent from "@/components/_userPage/UserCommunitiesContent";
import UserMissionsContent from "@/components/_userPage/UserMissionsContent";
import UserProjectsContent from "@/components/_userPage/UserProjectsContent";
import { useGameProgramByUserId } from "@/hooks/dbData/useGameProgram";
import BackButton from "@/components/buttons/BackButton";

const UserPage = () => {
  const params = useParams();
  const userId = params.userId as string;
  const { useGetUser } = useUser();
  const {
    data: gameProgramData,
    isLoading: isGameProgramLoading,
    error: gameProgramError,
  } = useGameProgramByUserId(userId);
  const { data: user, isLoading, error } = useGetUser(userId);
  const [activeTab, setActiveTab] = useState("projects");

  if (isLoading || isGameProgramLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  if (error || gameProgramError)
    return <div>Error: {error?.message || gameProgramError?.message}</div>;
  if (!user || !gameProgramData) return <div>User not found</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return <UserProjectsContent userId={userId} />;
      case "missions":
        return <UserMissionsContent userId={userId} />;
      case "communities":
        return <UserCommunitiesContent />;
      default:
        return <UserProjectsContent userId={userId} />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <BackButton />
      <UserProfileHeader
        user={user.data}
        gameProgramData={gameProgramData.data}
      />
      <UserTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </div>
  );
};

export default UserPage;
