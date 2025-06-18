import { useState } from "react";
import { skills } from "@/shared/constants/skills";
import { useMission } from "@/hooks/dbData/useMission";
import toast from "react-hot-toast";
import ButtonLabelAsync from "@/components/buttons/_ButtonLabelAsync";
import InputField from "@/components/displayElements/InputField";
import Selector from "@/components/displayElements/Selector";
import ModalLayout from "@/components/modals/_ModalLayout";

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
  const { useCreateMission } = useMission();
  const { mutateAsync: createMission, isPending: isCreating } =
    useCreateMission;
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
      await createMission({
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

        <InputField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Selector
          label="Category"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          options={skills}
          required
        />

        <InputField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          textarea
          required
        />

        <label className="flex items-center gap-2 bodyStyle">
          <input
            type="checkbox"
            checked={isPaid}
            onChange={(e) => setIsPaid(e.target.checked)}
          />
          Paid mission
        </label>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button type="submit" className="w-full md:w-auto">
          <ButtonLabelAsync label="Create mission" isLoading={isCreating} />
        </button>
      </form>
    </ModalLayout>
  );
};

export default CreateMissionModal;
