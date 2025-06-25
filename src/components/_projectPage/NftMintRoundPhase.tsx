"use client";
import MainProjectInfos from "@/components/_projectPage/MainProjectInfos";
import BuyNftModal from "@/components/modals/BuyNftModal";
import StatusTag from "@/components/tags/StatusTag";
import { Project } from "@/features/projects/types";
import { User } from "@/features/users/types";
import { useState } from "react";

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
      <MainProjectInfos project={props.project} owner={props.owner} />

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
