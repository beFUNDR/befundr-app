"use client";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";
import ModalLayout from "@/components/modals/_ModalLayout";
import { useMission } from "@/hooks/dbData/useMission";

type Props = {
  missionId: string;
  projectId: string;
  onClose: () => void;
};

const DeleteMissionModal = (props: Props) => {
  const { useDeleteMission } = useMission();
  const { mutateAsync: deleteMission, isPending: isDeleting } =
    useDeleteMission;

  const handleDelete = async () => {
    await deleteMission({
      missionId: props.missionId,
      projectId: props.projectId,
    });
    props.onClose();
  };

  return (
    <ModalLayout justify="center" item="center" onClose={props.onClose}>
      <h2 className="h3Style mb-2">
        Are you sure you want to delete this mission?
      </h2>
      <p className="bodyStyle mb-4">
        This action cannot be undone. This will permanently delete the mission
        from the project.
      </p>
      <div className="flex items-center gap-4">
        <button className="buttonStyle" onClick={props.onClose}>
          <ButtonLabelSecondary label="Cancel" />
        </button>
        <button
          className="buttonStyle"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          <ButtonLabelAsync label="Delete" isLoading={isDeleting} />
        </button>
      </div>
    </ModalLayout>
  );
};

export default DeleteMissionModal;
