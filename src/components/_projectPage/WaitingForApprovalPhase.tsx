import DiscordButton from "@/components/buttons/DiscordButton";
import InternetButton from "@/components/buttons/InternetButton";
import TelegramButton from "@/components/buttons/TelegramButton";
import XButton from "@/components/buttons/XButton";
import CommunityLogo from "@/components/displayElements/CommunityLogo";
import Divider from "@/components/displayElements/Divider";
import StatusTag from "@/components/tags/StatusTag";
import Image from "next/image";
import Link from "next/link";
import DefaultAvatar from "../displayElements/DefaultAvatar";

type Props = { project: Project; owner: User };

const WaitingForApprovalPhase = (props: Props) => {
  return (
    <div className="flex-1 flex flex-col justify-between gap-2 bg-black/70 rounded-2xl p-4 md:p-8 border border-custom-gray-600 min-w-[350px]">
      {/* Title */}
      <div className="flex justify-between items-center gap-2">
        <p className="h3Style">Project is in review</p>
        <StatusTag status={props.project.status} />
      </div>
      <p className="bodyStyle -mt-2">
        beFUNDR is reviewing the project to ensure it meets our guidelines.
      </p>
      <p className="h4Style mt-4">Builder</p>
      {/* Owner & stats */}
      <div className="flex justify-between items-stretch gap-4">
        <Link
          href={`/skillshub/${props.owner.wallet}`}
          className="flex justify-start items-center gap-4 "
        >
          {props.owner.avatar ? (
            <Image
              src={props.owner.avatar}
              alt={props.owner.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <DefaultAvatar size={10} publicKey={props.owner.wallet} />
          )}
          <div>
            <div className="font-bold text-white">{props.owner.name}</div>
            <div className="text-xs text-gray-400">Project owner</div>
          </div>
        </Link>
        {props.project.supportedBy && (
          <div className="flex flex-col items-end justify-end gap-2">
            <p className="font-bold text-white">Supported by</p>
            <div className="flex justify-end gap-2">
              {props.project.supportedBy.map((community, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center w-10 h-10"
                >
                  <CommunityLogo collectionName={community} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Divider />
      {/* Socials */}
      <p className="h4Style">Socials</p>
      <div className="grid grid-cols-4 gap-4 justify-center mb-2 justify-items-center">
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
    </div>
  );
};

export default WaitingForApprovalPhase;
