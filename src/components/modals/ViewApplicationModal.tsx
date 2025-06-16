"use client";
import { useGameProgramByUserId } from "@/hooks/dbData/useGameProgram";
import UserProfileHeader from "../_userPage/UserProfileHeader";
import ModalLayout from "./_ModalLayout";
import Divider from "../displayElements/Divider";
import ButtonLabelAsync from "../buttons/_ButtonLabelAsync";
import ButtonLabelSecondaryAsync from "../buttons/_ButtonLabelSecondaryAsync";
import Link from "next/link";
import { useMissionApplication } from "@/hooks/dbData/useMissionApplication";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  onClose: () => void;
  application: MissionApplication;
  applicationId: string;
  user: User;
};

const ViewApplicationModal = ({
  onClose,
  application,
  applicationId,
  user,
}: Props) => {
  const {
    data: gameProgramData,
    isLoading: isGameProgramLoading,
    error: gameProgramError,
  } = useGameProgramByUserId(user.wallet);

  const { useUpdateApplicationStatus } = useMissionApplication();
  const { mutateAsync: updateApplicationStatus } = useUpdateApplicationStatus;

  const [isRejecting, setIsRejecting] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await updateApplicationStatus({
        applicationId: applicationId,
        missionId: application.missionId,
        userId: application.userId,
        status: "rejected",
      });
      toast.success("Application rejected");
    } catch (error) {
      console.error(error);
      toast.error("Error rejecting application");
    } finally {
      onClose();
      setIsRejecting(false);
    }
  };

  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await updateApplicationStatus({
        applicationId: applicationId,
        missionId: application.missionId,
        userId: application.userId,
        status: "accepted",
      });
      toast.success("Application accepted");
    } catch (error) {
      console.error(error);
      toast.error("Error accepting application");
    } finally {
      onClose();
      setIsAccepting(false);
    }
  };

  if (!user || !gameProgramData) return <div>User not found</div>;

  return (
    <ModalLayout justify="center" item="center" onClose={onClose}>
      <UserProfileHeader user={user} gameProgramData={gameProgramData.data} />
      <Link href={`/skillshub/${user.wallet}`}>
        <p className="text-accent underline font-semibold text-base mb-2 w-fit">
          See full profile →
        </p>
      </Link>
      <Divider />
      <div className="h3Style">{user.name} application</div>
      <p className="bodyStyle !italic">&quot;{application.text}&quot;</p>
      <Divider />
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <button
          className="w-full"
          onClick={handleReject}
          disabled={isAccepting || isRejecting}
        >
          <ButtonLabelSecondaryAsync label="reject" isLoading={isRejecting} />
        </button>
        <button
          className="w-full"
          onClick={handleAccept}
          disabled={isAccepting || isRejecting}
        >
          <ButtonLabelAsync label="accept" isLoading={isAccepting} />
        </button>
      </div>
    </ModalLayout>
  );
};

export default ViewApplicationModal;
