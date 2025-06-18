"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useUpdate } from "@/hooks/dbData/useUpdate";
import { useWallet } from "@solana/wallet-adapter-react";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import InputField from "@/components/displayElements/InputField";
import ModalLayout from "@/components/modals/_ModalLayout";

interface EdiUpdateModalProps {
  updateId: string;
  onClose: () => void;
  projectId: string;
  update: Update;
}

const EditUpdateModal = ({
  updateId,
  onClose,
  projectId,
  update,
}: EdiUpdateModalProps) => {
  const { publicKey } = useWallet();
  const { useEditUpdate } = useUpdate();
  const { mutateAsync: editUpdate, isPending: isEditing } = useEditUpdate;

  const [title, setTitle] = useState(update.title);
  const [message, setMessage] = useState(update.message);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await editUpdate({
        projectId,
        updateId,
        title,
        message,
      });
      setTitle("");
      setMessage("");
      onClose();
      toast.success("Update edited successfully");
    } catch (err: any) {
      setError(err.message || "Error creating update");
      toast.error("Error creating update");
    }
  };

  return (
    <ModalLayout justify="center" item="center" onClose={onClose} dark>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h2 className="h3Style mb-2">Edit the update</h2>

        <InputField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          label="Description"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          textarea
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button type="submit" className="w-full md:w-auto" disabled={isEditing}>
          <ButtonLabelAsync label="Edit update" isLoading={isEditing} />
        </button>
      </form>
    </ModalLayout>
  );
};

export default EditUpdateModal;
