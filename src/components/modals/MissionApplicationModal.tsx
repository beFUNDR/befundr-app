"use client";
import { useState } from "react";
import ModalLayout from "./_ModalLayout";
import ButtonLabelAsync from "../buttons/_ButtonLabelAsync";
import toast from "react-hot-toast";
import InputField from "../displayElements/InputField";
import { useMissionApplication } from "@/hooks/dbData/useMissionApplication";
import { useWallet } from "@solana/wallet-adapter-react";

interface ApplyMissionModalProps {
  missionId: string;
  projectId: string;
  onClose: () => void;
}

const MissionApplicationModal = ({
  missionId,
  projectId,
  onClose,
}: ApplyMissionModalProps) => {
  const { publicKey } = useWallet();
  const { useCreateApplication } = useMissionApplication();
  const { mutateAsync: createApplication, isPending: isApplying } =
    useCreateApplication;

  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!publicKey) {
      toast.error("Please connect your wallet to apply");
      return;
    }

    try {
      await createApplication({
        application: {
          missionId,
          userId: publicKey.toString(),
          text,
        },
        projectId: projectId,
      });
      setText("");
      onClose();
      toast.success("Application submitted successfully");
    } catch (err: any) {
      setError(err.message || "Error submitting application");
      toast.error("Error submitting application");
    }
  };

  return (
    <ModalLayout justify="center" item="center" onClose={onClose} dark>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <h2 className="h3Style mb-2">Apply to this mission</h2>

        <InputField
          label="Why do you want to work on this mission?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          textarea
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          className="w-full md:w-auto"
          disabled={isApplying}
        >
          <ButtonLabelAsync label="Submit application" isLoading={isApplying} />
        </button>
      </form>
    </ModalLayout>
  );
};

export default MissionApplicationModal;
