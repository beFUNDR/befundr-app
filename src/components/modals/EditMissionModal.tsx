"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Mission, useMission } from "@/features/missions";
import { useWallet } from "@solana/wallet-adapter-react";
import { skills } from "@/shared/constants/skills";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import InputField from "@/components/displayElements/InputField";
import Selector from "@/components/displayElements/Selector";
import ModalLayout from "@/components/modals/_ModalLayout";

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
  const { useEditMission } = useMission();
  const { mutateAsync: editMission, isPending: isEditing } = useEditMission;

  const [formState, setFormState] = useState<Mission>({ ...mission });

  const [error, setError] = useState<string | null>(null);

  /**
   * Returns an event handler function that updates the form state for a specific field of a `Mission` object.
   *
   * This is a higher-order function commonly used in forms to reduce repetition.
   * It supports both standard inputs and checkbox inputs by detecting the input type.
   *
   * @param field - The key of the `Mission` object to update (e.g., 'title', 'description', 'isPaid').
   * @returns A function that handles the change event from an input element and updates the form state accordingly.
   *
   * @example
   * <input onChange={handleChange("title")} />
   * <input type="checkbox" onChange={handleChange("isPaid")} />
   */
  const handleChange = (field: keyof Mission) => (e: any) => {
    const value =
      e.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await editMission({ ...formState });
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
          value={formState.title}
          onChange={handleChange("title")}
          required
        />
        <InputField
          label="Description"
          value={formState.description}
          onChange={handleChange("description")}
          textarea
          required
        />
        <Selector
          label="Category"
          value={formState.skill}
          onChange={handleChange("skill")}
          options={skills}
          required
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPaid"
            checked={formState.isPaid}
            onChange={handleChange("isPaid")}
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
