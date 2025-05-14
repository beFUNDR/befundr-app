import ButtonLabelAsync from "../buttons/_ButtonLabelAsync";
import InputField from "../displayElements/InputField";
import ProfileImageUpload from "../_profile/ProfileImageUpload";

type ProfilContentProps = {
  profilePic: string;
  handleImageChange: (file: File) => void;
  pseudo: string;
  setPseudo: (v: string) => void;
  bio: string;
  setBio: (v: string) => void;
  allSkills: string[];
  selectedSkills: string[];
  handleSkillClick: (skill: string) => void;
  website: string;
  setWebsite: (v: string) => void;
  telegram: string;
  setTelegram: (v: string) => void;
  twitter: string;
  setTwitter: (v: string) => void;
  discord: string;
  setDiscord: (v: string) => void;
  handleSave: () => void;
  isUpdating: boolean;
  isCompleteProfil: boolean;
};

const ProfilContent = ({
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
  isCompleteProfil,
}: ProfilContentProps) => {
  return (
    <>
      <h2 className="h3Style mb-4">Personal details</h2>
      <p className="bodyStyle mb-6">
        Information marked with * is required to appear in the Skills Hub or to
        create a project.
      </p>
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
        required
      />

      {/* Section Skills */}
      <h2 className="h3Style mb-4 mt-8">Skills *</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {allSkills.map((skill) => (
          <button
            type="button"
            key={skill}
            onClick={() => handleSkillClick(skill)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-semibold bg-custom-gray-800 transition-all duration-300
              ${
                selectedSkills.includes(skill)
                  ? " text-accent border-accent"
                  : " text-custom-gray-400 border-custom-gray-400 hover:bg-white/30"
              }
            `}
          >
            {skill}
          </button>
        ))}
      </div>

      <h2 className="h3Style mb-4 mt-8">Social links (* at least one)</h2>
      <InputField
        label="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      />
      <InputField
        label="Telegram"
        value={telegram}
        onChange={(e) => setTelegram(e.target.value)}
      />
      <InputField
        label="Twitter"
        value={twitter}
        onChange={(e) => setTwitter(e.target.value)}
      />
      <InputField
        label="Discord"
        value={discord}
        onChange={(e) => setDiscord(e.target.value)}
      />
      <div className="flex justify-center mt-10">
        <button
          className="w-1/3 mx-auto"
          onClick={handleSave}
          disabled={isUpdating}
        >
          <ButtonLabelAsync label="Save" isLoading={isUpdating} />
        </button>
      </div>
      {isCompleteProfil && (
        <p className="bodyStyle my-4 !text-green-400 text-center">
          Your profile is complete.
          <br /> You can now create a project and be displayed on the skills
          hub.
        </p>
      )}
    </>
  );
};

export default ProfilContent;
