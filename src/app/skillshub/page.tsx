"use client";

import UserSkillCard from "@/components/cards/UserSkillsCard";
import Loader from "@/components/displayElements/Loader";
import { useGetAllUsers } from "@/hooks/dbData/useUser";
import Link from "next/link";
import { useState } from "react";

const SkillHubPage = () => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    error: usersError,
  } = useGetAllUsers();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  // Récupérer toutes les compétences uniques
  const skills = users
    ? Array.from(
        new Set(
          users
            .filter((user) => user.data.isCompleteProfil)
            .flatMap((user) => user.data.skills || [])
        )
      )
    : [];

  // Filtrer les utilisateurs selon la compétence sélectionnée
  const filteredUsers = users
    ? users.filter((user) =>
        selectedSkill
          ? user.data.isCompleteProfil &&
            user.data.skills?.includes(selectedSkill)
          : user.data.isCompleteProfil
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

      {/* Filtres compétences */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
        <button
          className={`min-w-20 py-2 rounded-full border text-sm font-semibold transition ${
            !selectedSkill
              ? "text-accent border-accent"
              : " text-custom-gray-400 border-custom-gray-400 hover:text-custom-gray-200 hover:border-custom-gray-200 "
          }`}
          onClick={() => setSelectedSkill(null)}
        >
          All
        </button>
        {skills.map((skill) => (
          <button
            key={skill}
            className={`px-4 py-2 rounded-full border text-sm font-semibold transition whitespace-nowrap ${
              selectedSkill === skill
                ? "text-accent border-accent"
                : " text-custom-gray-400 border-custom-gray-400 hover:text-custom-gray-200 hover:border-custom-gray-200 "
            }`}
            onClick={() => setSelectedSkill(skill)}
          >
            {skill}
          </button>
        ))}
      </div>

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
              <UserSkillCard user={user.data} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillHubPage;
