import ProfileImageUpload from "@/components/_profile/ProfileImageUpload";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import Checkbox from "@/components/buttons/Checkbox";
import InputField from "@/components/displayElements/InputField";

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
  isCompleteProfile: boolean;
  displayInSkillsHub: boolean;
  setDisplayInSkillsHub: (v: boolean) => void;
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
  isCompleteProfile,
  displayInSkillsHub,
  setDisplayInSkillsHub,
}: ProfilContentProps) => {
  return (
    <>
      <h2 className="h2Style mb-4">Personal details</h2>
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
      <h2 className="h2Style mb-4">Skills Hub</h2>
      <p className="bodyStyle mb-4">
        The skills hub is where you profile can be seen by project founders who
        looking for specific skills for theirs projects. To make your profile
        visible, please activate the option below.
      </p>
      <Checkbox
        label="Display my profile in skills hub"
        checked={displayInSkillsHub}
        onChange={() => setDisplayInSkillsHub(!displayInSkillsHub)}
      />
      <h3 className="h3Style mb-4 mt-8">Skills *</h3>
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

      <h3 className="h3Style mb-4 mt-8">Social links (* at least one)</h3>
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
          className="w-full md:w-1/3 mx-auto"
          onClick={handleSave}
          disabled={isUpdating}
        >
          <ButtonLabelAsync
            label="Save"
            isLoading={isUpdating}
            disabled={!isCompleteProfile && displayInSkillsHub}
          />
        </button>
      </div>
      {!isCompleteProfile && displayInSkillsHub && (
        <p className="bodyStyle my-4 !text-red-400 text-center">
          Your profile is not complete to be diplayed in the skills hub. Please
          complete it or disable the skills hub option
        </p>
      )}
      {isCompleteProfile && (
        <p className="bodyStyle my-4 !text-green-400 text-center">
          Your profile is complete. You can now create a project
        </p>
      )}
      {isCompleteProfile && displayInSkillsHub && (
        <p className="bodyStyle my-4 !text-green-400 text-center">
          Your profile will be displayed in the skills hub
        </p>
      )}
    </>
  );
};

export default ProfilContent;
