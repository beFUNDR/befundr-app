"use client";

import { useUser } from "@/hooks/dbData/useUser";
import UserSkillCard from "@/components/cards/UserSkillsCard";
import Loader from "@/components/displayElements/Loader";
import BackButton from "@/components/buttons/BackButton";
import Link from "next/link";

const SkillHubPage = () => {
  const { users, isLoadingUsers, usersError } = useUser(undefined);

  const testUsers = users ? Array(20).fill({ data: users[0].data }) : [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <BackButton />
      <h1 className="h1Style mb-6">Discover the community's skills</h1>
      <p className="bodyStyle max-w-xl mb-10">
        BeFUNDR is a community of builders, investors, and enthusiasts. We
        believe in the power of collaboration and the importance of building
        strong relationships.
      </p>

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
          className="grid gap-8  w-full justify-center"
          style={{
            gridTemplateColumns:
              "repeat(auto-fit,minmax(min(200px, 100%), 200px))",
          }} // handle automatic number of column in responsive
        >
          {users &&
            users.map((user, idx) => (
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
