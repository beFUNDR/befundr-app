"use client";
import { useState } from "react";
import ModalLayout from "./_ModalLayout";
import ButtonLabelAsync from "../buttons/_ButtonLabelAsync";
import toast from "react-hot-toast";
import InputField from "../displayElements/InputField";
import { useUpdate } from "@/hooks/dbData/useUpdate";
import { useWallet } from "@solana/wallet-adapter-react";

interface CreateMissionModalProps {
  onClose: () => void;
  projectId: string;
}

const CreateUpdateModal = ({ onClose, projectId }: CreateMissionModalProps) => {
  const { publicKey } = useWallet();
  const { useCreateUpdate, useLikeUpdate } = useUpdate();
  const { mutateAsync: createUpdate, isPending: isCreating } = useCreateUpdate;
  const { mutateAsync: likeUpdate, isPending: isLiking } = useLikeUpdate;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createUpdate({
        projectId,
        authorId: publicKey?.toString() || "",
        title,
        date: new Date().toISOString(),
        message: description,
        likesCount: [],
      });
      setTitle("");
      setDescription("");
      onClose();
      toast.success("Update created successfully");
    } catch (err: any) {
      setError(err.message || "Error creating update");
      toast.error("Error creating update");
    }
  };

  return (
    <ModalLayout justify="center" item="center" onClose={onClose} dark>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h2 className="h3Style mb-2">Create a new update</h2>

        <InputField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          textarea
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full md:w-auto"
          disabled={isCreating}
        >
          <ButtonLabelAsync label="Create update" isLoading={isCreating} />
        </button>
      </form>
    </ModalLayout>
  );
};

export default CreateUpdateModal;
