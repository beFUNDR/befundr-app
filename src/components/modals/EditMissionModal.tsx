"use client";
import { useState } from "react";
import ModalLayout from "./_ModalLayout";
import ButtonLabelAsync from "../buttons/_ButtonLabelAsync";
import toast from "react-hot-toast";
import InputField from "../displayElements/InputField";
import { useMission } from "@/hooks/dbData/useMission";
import { useWallet } from "@solana/wallet-adapter-react";
import { skills } from "@/data/localData";
import Selector from "../displayElements/Selector";

interface EditMissionModalProps {
  missionId: string;
  onClose: () => void;
  projectId: string;
  mission: Mission;
}

const EditMissionModal = ({
  missionId,
  onClose,
  projectId,
  mission,
}: EditMissionModalProps) => {
  const { publicKey } = useWallet();
  const { useEditMission } = useMission();
  const { mutateAsync: editMission, isPending: isEditing } = useEditMission;

  const [title, setTitle] = useState(mission.title);
  const [description, setDescription] = useState(mission.description);
  const [skill, setSkill] = useState(mission.skill);
  const [isPaid, setIsPaid] = useState(mission.isPaid);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await editMission({
        projectId,
        missionId,
        title,
        description,
        skill,
        isPaid,
      });
      setTitle("");
      setDescription("");
      setSkill("");
      setIsPaid(false);
      onClose();
      toast.success("Mission edited successfully");
    } catch (err: any) {
      setError(err.message || "Error editing mission");
      toast.error("Error editing mission");
    }
  };

  return (
    <ModalLayout justify="center" item="center" onClose={onClose} dark>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h2 className="h3Style mb-2">Edit the mission</h2>

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
        <Selector
          label="Category"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          options={skills}
          required
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPaid"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="isPaid" className="text-sm text-gray-400">
            This is a paid mission
          </label>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button type="submit" className="w-full md:w-auto" disabled={isEditing}>
          <ButtonLabelAsync label="Edit mission" isLoading={isEditing} />
        </button>
      </form>
    </ModalLayout>
  );
};

export default EditMissionModal;
