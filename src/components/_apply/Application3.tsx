import DiscordButton from "@/components/buttons/DiscordButton";
import InternetButton from "@/components/buttons/InternetButton";
import OtherButton from "@/components/buttons/OtherButton";
import PitchButton from "@/components/buttons/PitchButton";
import TelegramButton from "@/components/buttons/TelegramButton";
import VideoButton from "@/components/buttons/VideoButton";
import XButton from "@/components/buttons/XButton";
import Divider from "@/components/displayElements/Divider";
import CategoryTag from "@/components/tags/CategoryTag";
import { Project } from "@/features/projects/types";
import { User } from "@/features/users/types";
import Image from "next/image";

type Props = {
  project: Partial<Project>;
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
      <div className="flex flex-col md:flex-row gap-8 border border-custom-gray-600 rounded-2xl p-2 md:p-4 ">
        {/* project card */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
          {/* project infos */}
          <div className="flex-1 bg-black/40 rounded-2xl p-4 md:p-8  w-full md:w-1/2 ">
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
              <CategoryTag category={project.category!} />
            </div>
            <p className="text-white mb-6 whitespace-pre-line">
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
            <p className="bodyStyle mb-2">Social links</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 justify-items-center w-full">
              {project.website && <InternetButton href={project.website} />}
              {project.twitter && <XButton href={project.twitter} />}
              {project.discord && <DiscordButton href={project.discord} />}
              {project.telegram && <TelegramButton href={project.telegram} />}
            </div>
            <Divider />
            <p className="bodyStyle mb-2">Info links</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 justify-items-center w-full ">
              {project.videoLink && <VideoButton href={project.videoLink} />}
              {project.pitchLink && <PitchButton href={project.pitchLink} />}
              {project.otherLink && <OtherButton href={project.otherLink} />}
            </div>
          </div>
          {/* Images */}
          <div className=" flex flex-col gap-4 items-center justify-center w-full md:w-1/2 ">
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
              <div className="flex items-center justify-center h-full w-full md:w-1/2 ">
                <p className="text-gray-400">Missing image</p>
              </div>
            )}
            {project.images && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
                {project.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt="Project image"
                    width={300}
                    height={300}
                    className="rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
