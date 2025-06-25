"use client";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";
import ModalLayout from "@/components/modals/_ModalLayout";
import { useMissionApplication } from "@/hooks/dbData/useMissionApplication";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  applicationId: string;
  missionId: string;
  userId: string;
};

const CancelMissionApplicationModal = (props: Props) => {
  const { useDeleteApplication } = useMissionApplication();
  const { mutateAsync: deleteApplication, isPending: isDeleting } =
    useDeleteApplication;

  const handleDelete = async () => {
    await deleteApplication({
      applicationId: props.applicationId,
      missionId: props.missionId,
      userId: props.userId,
    });
    toast.success("Application removed successfully");
    props.onClose();
  };
  return (
    <ModalLayout justify="center" item="center" onClose={props.onClose}>
      <h2 className="h3Style mb-2">
        Are you sure you want to remove your application?
      </h2>
      <p className="bodyStyle mb-4">
        This action cannot be undone. This will permanently remove your
        application from the mission.
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
          <ButtonLabelAsync label="Remove" isLoading={isDeleting} />
        </button>
      </div>
    </ModalLayout>
  );
};

export default CancelMissionApplicationModal;
