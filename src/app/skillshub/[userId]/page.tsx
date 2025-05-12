"use client";
import Loader from "@/components/displayElements/Loader";
import { useUser } from "@/hooks/dbData/useUser";
import { useParams } from "next/navigation";
import { useState } from "react";
import UserProfileHeader from "@/components/_userPage/UserProfileHeader";
import UserTabs from "@/components/_userPage/UserTabs";
import UserDAOsContent from "@/components/_userPage/UserDAOsContent";
import UserContributionsContent from "@/components/_userPage/UserContributionsContent";
import UserProjectsContent from "@/components/_userPage/UserProjectsContent";

const UserPage = () => {
  const params = useParams();
  const userId = params.userId as string;
  const { getUser } = useUser(userId);
  const { data: user, isLoading, error } = getUser(userId);
  const [activeTab, setActiveTab] = useState("projects");

  console.log(userId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return <div>User not found</div>;

  const renderTabContent = () => {
    switch (activeTab) {
      case "projects":
        return <UserProjectsContent userId={userId} />;
      case "contributions":
        return <UserContributionsContent />;
      case "daos":
        return <UserDAOsContent />;
      default:
        return <UserProjectsContent userId={userId} />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 w-full">
      <UserProfileHeader user={user} />
      <UserTabs activeTab={activeTab} onTabChange={setActiveTab} />
      {renderTabContent()}
    </div>
  );
};

export default UserPage;
