"use client";
import { useState, useEffect, Suspense } from "react";
import ProfileMenu from "@/components/_profile/ProfileMenu";
import { useWallet } from "@solana/wallet-adapter-react";
import Loader from "@/components/displayElements/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { skills as allSkills } from "@/shared/constants/skills";
import ProfilContent from "@/components/_myProfile.tsx/ProfilContent";
import UserProjectsContent from "@/components/_userPage/UserProjectsContent";
import UserMissionsContent from "@/components/_userPage/UserMissionsContent";
import UserCommunitiesContent from "@/components/_userPage/UserCommunitiesContent";
import UserApplicationsContent from "@/components/_userPage/UserApplicationsContent";
import { useGetUser, useUpdateUser } from "@/features/users/hooks/useUser";

function MyProfilePage() {
  //* GLOBAL STATE
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "My profile";
  const { publicKey, connected } = useWallet();
  const {
    data: user,
    isLoading,
    error,
  } = useGetUser(publicKey?.toString() ?? undefined);
  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  //* LOCAL STATE
  const [profilePic, setProfilePic] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [bio, setBio] = useState("");
  const [activeSection, setActiveSection] = useState(initialTab);
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [discord, setDiscord] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      setPseudo(user.name || "");
      setBio(user.bio || "");
      setTelegram(user.telegram || "");
      setTwitter(user.twitter || "");
      setWebsite(user.website || "");
      setDiscord(user.discord || "");
      if (user.avatar) setProfilePic(user.avatar);
      setSelectedSkills(user.skills || []);
    }
  }, [user]);

  const handleImageChange = (file: File) => {
    // Ici, tu peux gérer l'upload ou l'affichage local
    const url = URL.createObjectURL(file);
    setProfilePic(url);
  };

  const handleSkillClick = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  // check if the profile is complete
  const isCompleteProfile = () => {
    // required field
    const hasRequiredFields = pseudo.trim() !== "" && bio.trim() !== "";

    // at least one social link
    const hasSocialLink =
      telegram.trim() !== "" ||
      twitter.trim() !== "" ||
      website.trim() !== "" ||
      discord.trim() !== "";

    // at least one skill
    const hasSkills = selectedSkills.length > 0;

    return hasRequiredFields && hasSocialLink && hasSkills;
  };

  const handleSave = async () => {
    if (!publicKey) return;
    await updateUser({
      wallet: publicKey.toString(),
      name: pseudo,
      bio,
      telegram,
      twitter,
      website,
      discord,
      avatar: profilePic,
      skills: selectedSkills,
      isCompleteProfile: isCompleteProfile(),
    });
  };

  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected, router]);

  const profilContentProps = {
    profilePic,
    handleImageChange,
    pseudo,
    setPseudo,
    bio,
    setBio,
    allSkills,
    selectedSkills,
    handleSkillClick,
    website,
    setWebsite,
    telegram,
    setTelegram,
    twitter,
    setTwitter,
    discord,
    setDiscord,
    handleSave,
    isUpdating,
    isCompleteProfile: isCompleteProfile(),
  };

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
      <h1 className="h1Style my-6 text-white">Welcome, {user?.name} 👋</h1>
      <ProfileMenu active={activeSection} onSelect={setActiveSection} />

      {activeSection === "My profile" && (
        <ProfilContent {...profilContentProps} />
      )}
      {activeSection === "My projects" && (
        <UserProjectsContent userId={publicKey?.toString() ?? ""} />
      )}
      {activeSection === "My missions" && (
        <UserMissionsContent userId={publicKey?.toString() ?? ""} />
      )}
      {activeSection === "My applications" && (
        <div className="text-white mt-8">
          <UserApplicationsContent />
        </div>
      )}
      {activeSection === "My investments" && (
        <div className="text-white mt-8">in progress</div>
      )}
      {activeSection === "My communities" && (
        <div className="text-white mt-8">
          <UserCommunitiesContent />
        </div>
      )}
    </div>
  );
}

export default function MyProfilePageWithSuspense() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      }
    >
      <MyProfilePage />
    </Suspense>
  );
}
