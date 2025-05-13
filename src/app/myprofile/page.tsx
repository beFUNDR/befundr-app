"use client";
import { useState, useEffect } from "react";
import ProfileMenu from "@/components/profile/ProfileMenu";
import InputField from "@/components/displayElements/InputField";
import { useUser } from "@/hooks/dbData/useUser";
import { useWallet } from "@solana/wallet-adapter-react";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import Loader from "@/components/displayElements/Loader";
import { useRouter } from "next/navigation";
import ProfileImageUpload from "@/components/profile/ProfileImageUpload";

export default function MyProfilePage() {
  //* GLOBAL STATE
  const router = useRouter();
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
  const [activeSection, setActiveSection] = useState("My Profile");
  const [telegram, setTelegram] = useState("");
  const [twitter, setTwitter] = useState("");
  const [website, setWebsite] = useState("");
  const [discord, setDiscord] = useState("");

  useEffect(() => {
    if (user) {
      setPseudo(user.name || "");
      setBio(user.bio || "");
      setTelegram(user.telegram || "");
      setTwitter(user.twitter || "");
      setWebsite(user.website || "");
      setDiscord(user.discord || "");
      if (user.avatar) setProfilePic(user.avatar);
    }
  }, [user]);

  const handleImageChange = (file: File) => {
    // Ici, tu peux gérer l'upload ou l'affichage local
    const url = URL.createObjectURL(file);
    setProfilePic(url);
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
      skills: [],
    });
  };

  useEffect(() => {
    if (!connected) {
      router.push("/");
    }
  }, [connected]);

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

      {activeSection === "My Profile" && (
        <>
          <h2 className="h3Style mb-4">Personal details</h2>
          <ProfileImageUpload
            imageUrl={profilePic}
            onImageChange={handleImageChange}
          />

          <InputField
            label="Pseudo (username)"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
            required
          />
          <InputField
            label="Short bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            textarea
          />
          <h2 className="h3Style mb-4 mt-8">Social links</h2>
          <InputField
            label="Website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
          />
          <InputField
            label="Telegram"
            value={telegram}
            onChange={(e) => setTelegram(e.target.value)}
            required
          />
          <InputField
            label="Twitter"
            value={twitter}
            onChange={(e) => setTwitter(e.target.value)}
            required
          />
          <InputField
            label="Discord"
            value={discord}
            onChange={(e) => setDiscord(e.target.value)}
            required
          />
          <h2 className="h3Style mb-4 mt-8">DAO & Community affiliation</h2>
        </>
      )}
      {activeSection === "My Projects" && (
        <div className="text-white mt-8">
          Section &quot;My Projects&quot; (à compléter)
        </div>
      )}
      {activeSection === "My Contributions" && (
        <div className="text-white mt-8">
          Section &quot;My Contributions&quot; (à compléter)
        </div>
      )}
      {activeSection === "My DAOs" && (
        <div className="text-white mt-8">
          Section &quot;My DAOs&quot; (à compléter)
        </div>
      )}
      {activeSection === "My Points" && (
        <div className="text-white mt-8">
          Section &quot;My Points&quot; (à compléter)
        </div>
      )}
      <button className="w-1/3" onClick={handleSave} disabled={isUpdating}>
        <ButtonLabelAsync label="Save" isLoading={isUpdating} />
      </button>
    </div>
  );
}
