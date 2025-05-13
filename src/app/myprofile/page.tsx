"use client";
import { useState, useEffect } from "react";
import ProfileMenu from "@/components/_profile/ProfileMenu";
import { useUser } from "@/hooks/dbData/useUser";
import { useWallet } from "@solana/wallet-adapter-react";
import Loader from "@/components/displayElements/Loader";
import { useRouter, useSearchParams } from "next/navigation";
import { skills as allSkills } from "@/data/localData";
import ProfilContent from "@/components/_myProfile.tsx/ProfilContent";
import UserProjectsContent from "@/components/_userPage/UserProjectsContent";
import UserMissionsContent from "@/components/_userPage/UserMissionsContent";

export default function MyProfilePage() {
  //* GLOBAL STATE
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "My profile";
  const { publicKey, connected } = useWallet();
  const {
    data: user,
    isLoading,
    updateUser,
    isUpdating,
  } = useUser(publicKey?.toString() ?? undefined);

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
    });
  };

  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected]);

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
      <h1 className="text-3xl font-bold mb-2 text-white">
        Welcome, {user?.name} 👋
      </h1>
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
      {activeSection === "My investments" && (
        <div className="text-white mt-8">
          Section &quot;My investments&quot; (à compléter)
        </div>
      )}
      {activeSection === "My communities" && (
        <div className="text-white mt-8">
          Section &quot;My communities&quot; (à compléter)
        </div>
      )}
    </div>
  );
}
