import { useState } from "react";
import ModalLayout from "./_ModalLayout";
import { skills } from "@/data/localData";
import { useMission } from "@/hooks/dbData/useMission";
import ButtonLabelAsync from "../buttons/_ButtonLabelAsync";
import toast from "react-hot-toast";

interface CreateMissionModalProps {
  open: boolean;
  onClose: () => void;
  projectId: string;
}

const CreateMissionModal = ({
  open,
  onClose,
  projectId,
}: CreateMissionModalProps) => {
  const { createAMission, isCreating } = useMission();
  const [title, setTitle] = useState("");
  const [skill, setSkill] = useState(skills[0]);
  const [description, setDescription] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await createAMission({
        projectId,
        title,
        skill,
        description,
        isPaid,
      });
      setSuccess(true);
      setTitle("");
      setSkill(skills[0]);
      setDescription("");
      setIsPaid(false);
      onClose();
      toast.success("Mission created successfully");
    } catch (err: any) {
      setError(err.message || "Error creating mission");
      toast.error("Error creating mission");
    }
  };

  if (!open) return null;

  return (
    <ModalLayout justify="center" item="center" onClose={onClose} dark>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h2 className="h3Style mb-2">Create a new mission</h2>
        <label className="bodyStyle">
          Title
          <input
            className="w-full mt-1 px-3 py-2 rounded bg-custom-gray-800 border border-custom-gray-600 text-white"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="bodyStyle">
          Category
          <select
            className="w-full mt-1 px-3 py-2 rounded bg-custom-gray-800 border border-custom-gray-600 text-white"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          >
            {skills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
        </label>
        <label className="bodyStyle">
          Description
          <textarea
            className="w-full mt-1 px-3 py-2 rounded bg-custom-gray-800 border border-custom-gray-600 text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={4}
          />
        </label>
        <label className="flex items-center gap-2 bodyStyle">
          <input
            type="checkbox"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
          />
          Paid mission
        </label>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit">
          <ButtonLabelAsync label="Create mission" isLoading={isCreating} />
        </button>
      </form>
    </ModalLayout>
  );
};

export default CreateMissionModal;
