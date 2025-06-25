"use client";

import UserSkillCard from "@/components/cards/UserSkillsCard";
import Loader from "@/components/displayElements/Loader";
import { useGetAllUsers } from "@/features/users/hooks/useUser";
import SkillsFilter from "@/shared/components/SkillsFilter";
import Link from "next/link";
import { useState } from "react";

const SkillHubPage = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useGetAllUsers();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Filter users by selected skill
  const filteredUsers = users
    ? users.filter((user) =>
        selectedSkill
          ? user.isCompleteProfile && user.skills?.includes(selectedSkill)
          : user.isCompleteProfile
      )
    : [];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
      <h1 className="h1Style my-6">Discover the community&apos;s skills</h1>
      <p className="bodyStyle max-w-xl mb-10">
        beFUNDR is a community of builders, investors, and enthusiasts. We
        believe in the power of collaboration and the importance of building
        strong relationships.
      </p>
      {/* Skills filter */}
      <SkillsFilter
        selectedSkill={selectedSkill}
        setSelectedSkill={setSelectedSkill}
      />
      {isLoadingUsers ? (
        <div className="flex justify-center items-center h-[500px]">
          <Loader />
        </div>
      ) : usersError ? (
        <div className="text-red-500">
          Erreur lors du chargement des utilisateurs
        </div>
      ) : (
        <div
          className="grid gap-4 md:gap-8 w-full justify-center"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit, minmax(min(160px, 100%), 1fr))",
          }}
        >
          {filteredUsers.map((user, idx) => (
            <Link key={idx} href={`/skillshub/${user.id}`}>
              <UserSkillCard user={user} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillHubPage;
