"use client";
import DiscordButton from "@/components/buttons/DiscordButton";
import InternetButton from "@/components/buttons/InternetButton";
import TelegramButton from "@/components/buttons/TelegramButton";
import XButton from "@/components/buttons/XButton";
import { useUser } from "@/hooks/dbData/useUser";
import Image from "next/image";

type Props = { project: Project };

const NftPresalePhase = (props: Props) => {
  const { data: owner } = useUser(props.project.userId);

  return (
    <div className="flex-1 flex flex-col gap-4 bg-black/40 rounded-2xl p-8 border border-gray-700 min-w-[350px]">
      {/* Progress bar */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-accent font-bold">{}% funded</span>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `100%` }}
          />
        </div>
      </div>
      {/* Amounts */}
      <div>
        <span className="text-3xl font-bold text-accent">USDC {}</span>
        <span className="block text-gray-400">pledged of USDC {} goal</span>
      </div>
      {/* Early access */}
      <div className="flex items-center gap-2 mb-2">
        <span className="bg-custom-gray-800 text-accent px-2 py-1 rounded-full text-xs">
          Early Access
        </span>
        {/* {supportedBy && (
              <div className="flex items-center gap-1">
                <CommunityLogo community={supportedBy} />
              </div>
            )} */}
      </div>
      {/* Owner & stats */}
      <div className="flex items-center gap-4 mb-2">
        {owner.avatar && (
          <Image
            src={owner.avatar}
            alt={owner.name}
            width={40}
            height={40}
            className="rounded-full"
          />
        )}
        <div>
          <div className="font-bold text-white">{owner.name}</div>
          <div className="text-xs text-gray-400">Project owner</div>
        </div>
        <div className="ml-auto flex gap-6">
          <div className="text-center">
            <div className="font-bold text-white">xxx</div>
            <div className="text-xs text-gray-400">Days left</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-white">xxx</div>
            <div className="text-xs text-gray-400">Contributions</div>
          </div>
        </div>
      </div>
      {/* Fund button */}
      <button className="w-full bg-accent text-black font-bold py-3 rounded-full text-lg mb-2">
        Fund
      </button>
      {/* Socials */}
      <div className="flex gap-4 justify-center mb-2">
        {props.project.website && (
          <InternetButton href={props.project.website} />
        )}
        {props.project.twitter && <XButton href={props.project.twitter} />}
        {props.project.discord && (
          <DiscordButton href={props.project.discord} />
        )}
        {props.project.telegram && (
          <TelegramButton href={props.project.telegram} />
        )}
      </div>
      <div className="text-xs text-gray-400 text-center">
        All or nothing. This project will only be funded if it reached its goal
        by February 14 2025 7:30 PM CET.
      </div>
    </div>
  );
};

export default NftPresalePhase;
