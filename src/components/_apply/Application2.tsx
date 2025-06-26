import InputField from "@/components/displayElements/InputField";
import { ProjectToCreate } from "@/features/projects/types";

type Props = {
  project: ProjectToCreate;
  setProject: (p: ProjectToCreate) => void;
};

export default function Application2({ project, setProject }: Props) {
  return (
    <form className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Project details</h2>
        <p className="text-gray-400 mb-4">
          Provide as many details as possible to help understand your project.
        </p>
        <InputField
          label="Headline"
          value={project.headLine || ""}
          onChange={(e) => setProject({ ...project, headLine: e.target.value })}
          placeholder="Your project headline"
          required
        />

        <InputField
          label="Project description"
          value={project.description || ""}
          onChange={(e) =>
            setProject({ ...project, description: e.target.value })
          }
          textarea
          required
          placeholder="Write a compelling description of your project.\nClearly explain what you're building, the problem you're solving, and why the community should care."
        />

        <InputField
          label="Pitch link"
          value={project.pitchLink || ""}
          onChange={(e) =>
            setProject({ ...project, pitchLink: e.target.value })
          }
          placeholder="https://pitch.com/yourproject"
        />
        <InputField
          label="Video link"
          value={project.videoLink || ""}
          onChange={(e) =>
            setProject({ ...project, videoLink: e.target.value })
          }
          placeholder="https://youtube.com/yourproject"
        />
        <InputField
          label="Other link"
          value={project.otherLink || ""}
          onChange={(e) =>
            setProject({ ...project, otherLink: e.target.value })
          }
          placeholder="https://yourproject.com"
        />
      </div>
      <div>
        <h3 className="text-xl font-bold text-white mb-2 mt-8">
          Where can people follow your project?
        </h3>
        <p className="text-gray-400 mb-4">
          Add links to your project&apos;s social channels so contributors can
          stay updated.
        </p>
        <InputField
          label="Website"
          value={project.website || ""}
          onChange={(e) => setProject({ ...project, website: e.target.value })}
          placeholder="https://yourproject.com"
        />
        <InputField
          label="X (Twitter)"
          value={project.twitter || ""}
          onChange={(e) => setProject({ ...project, twitter: e.target.value })}
          placeholder="@yourproject"
        />
        <InputField
          label="Discord"
          value={project.discord || ""}
          onChange={(e) => setProject({ ...project, discord: e.target.value })}
          placeholder="https://discord.gg/yourproject"
        />
        <InputField
          label="Telegram"
          value={project.telegram || ""}
          onChange={(e) => setProject({ ...project, telegram: e.target.value })}
          placeholder="https://t.me/yourproject"
        />
      </div>
    </form>
  );
}
