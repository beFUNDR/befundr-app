import Image from "next/image";
import Link from "next/link";
import DefaultAvatar from "../displayElements/DefaultAvatar";
import CommunityLogo from "../displayElements/CommunityLogo";
import Divider from "../displayElements/Divider";
import InternetButton from "../buttons/InternetButton";
import XButton from "../buttons/XButton";
import DiscordButton from "../buttons/DiscordButton";
import TelegramButton from "../buttons/TelegramButton";
import PitchButton from "../buttons/PitchButton";
import VideoButton from "../buttons/VideoButton";
import OtherButton from "../buttons/OtherButton";

type Props = {
  project: Project;
  owner: User;
};

const MainProjectInfos = (props: Props) => {
  return (
    <>
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
      <Divider />
      {/* Info links */}
      <p className="h4Style">Infos</p>
      <div className="grid grid-cols-4 gap-4 justify-center mb-2 justify-items-center">
        {props.project.pitchLink && (
          <PitchButton href={props.project.pitchLink} />
        )}
        {props.project.videoLink && (
          <VideoButton href={props.project.videoLink} />
        )}
        {props.project.otherLink && (
          <OtherButton href={props.project.otherLink} />
        )}
      </div>
    </>
  );
};

export default MainProjectInfos;
