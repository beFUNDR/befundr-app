"use client";
// type Props = {};

import { useMissionApplication } from "@/hooks/dbData/useMissionApplication";
import { useWallet } from "@solana/wallet-adapter-react";
import MissionApplicationCard from "../cards/MissionApplicationCard";

const UserApplicationsContent = () => {
  const { useGetMissionApplicationsByUser } = useMissionApplication();
  const { publicKey } = useWallet();

  const { data: applications } = useGetMissionApplicationsByUser(
    publicKey?.toString() || ""
  );

  console.log(applications);

  if (!publicKey) {
    return <div>Please connect your wallet to view your applications</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {applications?.map((application) => (
        <MissionApplicationCard
          key={application.id}
          application={application.data}
          applicationId={application.id}
        />
      ))}
      {applications?.map((application) => (
        <MissionApplicationCard
          key={application.id}
          application={application.data}
          applicationId={application.id}
        />
      ))}
      {applications?.map((application) => (
        <MissionApplicationCard
          key={application.id}
          application={application.data}
          applicationId={application.id}
        />
      ))}
      {applications?.map((application) => (
        <MissionApplicationCard
          key={application.id}
          application={application.data}
          applicationId={application.id}
        />
      ))}
    </div>
  );
};

export default UserApplicationsContent;
