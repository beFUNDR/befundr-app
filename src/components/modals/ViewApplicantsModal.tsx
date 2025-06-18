"use client";
import { useMissionApplication } from "@/hooks/dbData/useMissionApplication";
import ModalLayout from "./_ModalLayout";
import LoaderSmall from "../displayElements/LoaderSmall";
import UserApplicationCard from "../cards/UserApplicationCard";
import { useState } from "react";
import ViewApplicationModal from "./ViewApplicationModal";
import { useGetUsers } from "@/hooks/dbData/useUser";

type Props = {
  onClose: () => void;
  missionId: string;
};

const ViewApplicantsModal = ({ onClose, missionId }: Props) => {
  const { useGetMissionApplicationsByMission } = useMissionApplication();
  const {
    data: applications,
    isLoading,
    error,
  } = useGetMissionApplicationsByMission(missionId);

  // fetch all the users from the applications
  const userIds =
    applications?.map((application) => application.data.userId) || [];
  const { data: users } = useGetUsers(userIds);

  const [isViewApplicationModalOpen, setIsViewApplicationModalOpen] =
    useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<MissionApplication | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);

  if (isLoading)
    return (
      <ModalLayout justify="center" item="center" onClose={onClose}>
        <div className="flex justify-center items-center h-full">
          <LoaderSmall />
        </div>
      </ModalLayout>
    );

  if (error)
    return (
      <ModalLayout justify="center" item="center" onClose={onClose}>
        <div>Error: {error.message}</div>
      </ModalLayout>
    );

  return (
    <ModalLayout justify="center" item="center" onClose={onClose}>
      <h2 className="h3Style mb-2">Applicants</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full justify-center items-center justify-items-center">
        {applications?.map((application) => {
          if (application.data.status === "rejected") return null;
          const user = users?.find((u) => u.wallet === application.data.userId);
          if (!user) return null;

          return (
            <button
              key={application.id}
              onClick={() => {
                setSelectedApplication(application.data);
                setSelectedUser(user);
                setSelectedApplicationId(application.id);
                setIsViewApplicationModalOpen(true);
              }}
            >
              <UserApplicationCard
                user={user}
                application={application.data}
                applicationId={application.id}
              />
            </button>
          );
        })}
      </div>
      {isViewApplicationModalOpen &&
        selectedApplication &&
        selectedUser &&
        selectedApplicationId && (
          <ViewApplicationModal
            onClose={() => setIsViewApplicationModalOpen(false)}
            application={selectedApplication}
            user={selectedUser}
            applicationId={selectedApplicationId}
          />
        )}
    </ModalLayout>
  );
};

export default ViewApplicantsModal;
