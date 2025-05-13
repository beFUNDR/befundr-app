import Image from "next/image";
import CategoryTag from "../tags/CategoryTag";
import Divider from "../displayElements/Divider";
import XButton from "../buttons/XButton";
import DiscordButton from "../buttons/DiscordButton";
import TelegramButton from "../buttons/TelegramButton";
import InternetButton from "../buttons/InternetButton";

type Props = {
  project: ProjectToCreate;
  user: User;
};

export default function Application3({ project, user }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Validation</h2>
        <p className="text-gray-400 mb-8">
          Finalize and review your application.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-8 border border-custom-gray-600 rounded-2xl p-4">
        {/* Fiche projet */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1 bg-black/40 rounded-2xl p-8  min-w-[350px]">
            <div className="flex items-center gap-4 mb-4">
              {project.logo && (
                <Image
                  src={project.logo}
                  alt="Logo"
                  width={56}
                  height={56}
                  className="rounded-full bg-black border border-gray-700"
                />
              )}
              <h3 className="text-3xl font-bold text-white">
                {project.name || "Missing name"}
              </h3>
            </div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              <CategoryTag category={project.category} />
            </div>
            <p className="text-white mb-6">
              {project.description || "Missing description"}
            </p>
            {/* user picture déplacé ici */}
            {user.name && user.avatar && (
              <div className="flex justify-start items-center gap-4 mt-4">
                {user.avatar && (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <div>
                  <div className="font-bold text-white">{user.name}</div>
                  <div className="text-xs text-gray-400">Project owner</div>
                </div>
              </div>
            )}
            <Divider />
            <div className="grid grid-cols-4 gap-4 mb-6">
              {project.website && <InternetButton href={project.website} />}
              {project.twitter && <XButton href={project.twitter} />}
              {project.discord && <DiscordButton href={project.discord} />}
              {project.telegram && <TelegramButton href={project.telegram} />}
            </div>
          </div>
          {/* Mock dashboard utilisateur */}
          <div className="flex-1 flex items-center justify-center min-w-[350px]">
            {project.mainImage && (
              <Image
                src={project.mainImage}
                alt="Dashboard preview"
                width={600}
                height={400}
                className="rounded-2xl"
              />
            )}
            {!project.mainImage && (
              <div className="flex items-center justify-center h-full w-full">
                <p className="text-gray-400">Missing image</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
