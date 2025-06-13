"use client";
import { useUpdate } from "@/hooks/dbData/useUpdate";
import ButtonLabelAsync from "../buttons/_ButtonLabelAsync";
import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import ModalLayout from "./_ModalLayout";

type Props = {
  updateId: string;
  projectId: string;
  onClose: () => void;
};

const DeleteUpdateModal = (props: Props) => {
  const { useDeleteUpdate } = useUpdate();
  const { mutateAsync: deleteUpdate, isPending: isDeleting } = useDeleteUpdate;

  const handleDelete = async () => {
    await deleteUpdate({
      updateId: props.updateId,
      projectId: props.projectId,
    });
    props.onClose();
  };

  return (
    <ModalLayout justify="center" item="center" onClose={props.onClose}>
      <h2 className="h3Style mb-2">
        Are you sure you want to delete this update?
      </h2>
      <p className="bodyStyle mb-4">
        This action cannot be undone. This will permanently delete the update
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

export default DeleteUpdateModal;
