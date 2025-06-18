"use client";
import { useState } from "react";
import { useUpdate } from "@/hooks/dbData/useUpdate";
import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";
import UpdateCard from "@/components/cards/UpdateCard";
import CreateUpdateModal from "@/components/modals/CreateUpdateModal";

type Props = {
  isOwner: boolean;
  projectId: string;
};

const UpdateContent = (props: Props) => {
  const { useGetUpdatesByProjectId } = useUpdate();
  const { data: updates, error } = useGetUpdatesByProjectId(props.projectId);

  const [isShowModal, setIsShowModal] = useState(false);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col justify-start items-center space-y-8 h-[500px] overflow-y-auto px-2">
      {props.isOwner && (
        <button className="w-40" onClick={() => setIsShowModal(true)}>
          <ButtonLabelSecondary label="Add an update" />
        </button>
      )}
      {updates
        ?.sort(
          (a, b) =>
            new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
        )
        .map((update, index) => (
          <UpdateCard
            key={index}
            update={update.data}
            updateId={update.id}
            isOwner={props.isOwner}
          />
        ))}
      {isShowModal && (
        <CreateUpdateModal
          onClose={() => setIsShowModal(false)}
          projectId={props.projectId}
        />
      )}
    </div>
  );
};

export default UpdateContent;
