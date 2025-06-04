"use client";
import DiscordButton from "@/components/buttons/DiscordButton";
import InternetButton from "@/components/buttons/InternetButton";
import TelegramButton from "@/components/buttons/TelegramButton";
import XButton from "@/components/buttons/XButton";
import Divider from "@/components/displayElements/Divider";
import StatusTag from "@/components/tags/StatusTag";
import Image from "next/image";
import Link from "next/link";
import DefaultAvatar from "../displayElements/DefaultAvatar";
import ButtonLabel from "../buttons/_ButtonLabel";
import { useState } from "react";
import BuyNftModal from "../modals/BuyNftModal";
import CommunityLogo from "../displayElements/CommunityLogo";

type Props = { project: Project; owner: User };

const NftMintRoundPhase = (props: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <div className=" flex flex-col justify-between gap-2 bg-black/70 rounded-2xl p-4 md:p-8 border border-custom-gray-600 min-w-[350px] aspect-square">
      {/* Title */}
      <div className="flex justify-between items-center gap-2">
        <p className="h3Style">Early adopters NFT sale live</p>
        <StatusTag status={props.project.status} />
      </div>
      <p className="bodyStyle -mt-2">
        Support this project and secure your supply allocation for the presale
      </p>

      <p className="h4Style mt-4">Sale informations</p>
      <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-2">
          <p className="bodyStyle">Supply</p>
          <p className="bodyStyle !font-bold">200</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="bodyStyle">Price</p>
          <p className="bodyStyle !font-bold">$250</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="bodyStyle">Estimated valuation</p>
          <p className="bodyStyle !font-bold">${(1000000).toLocaleString()}</p>
        </div>
      </div>

      <div className="flex justify-start items-baseline gap-2">
        <p className="h4Style mt-4">Builder</p>
      </div>
      {/* Owner & stats */}
      <div className="flex justify-between items-stretch gap-2">
        <div className="flex flex-col justify-start items-start gap-2">
          <div className="flex justify-between items-stretch w-full gap-2">
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
          </div>
          {props.project.supportedBy && (
            <div className="flex justify-start items-center gap-2">
              {props.project.supportedBy.map((community, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center w-10 h-10"
                >
                  <CommunityLogo collectionName={community} />
                </div>
              ))}
              <p className="h4Style">Supported by</p>
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-accent font-bold">23/200 sold</p>
          <button onClick={() => setIsOpenModal(true)}>
            <ButtonLabel label="Buy now" />
          </button>
        </div>
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
      {isOpenModal && (
        <BuyNftModal
          onClose={() => setIsOpenModal(false)}
          project={props.project}
          price={250}
        />
      )}
    </div>
  );
};

export default NftMintRoundPhase;
