type Props = {
  status: "pending" | "accepted" | "rejected";
};

const statusConfig = {
  pending: {
    label: "Pending",
    className: "bg-accent/20  text-accent",
  },
  accepted: {
    label: "Accepted",
    className: "bg-green-500/20  text-green-500",
  },
  rejected: {
    label: "Rejected",
    className: "bg-red-500/20  text-red-500",
  },
};

const MissionStatusTag = ({ status }: Props) => {
  const statusToDisplay = statusConfig[status];

  return (
    <span
      className={`w-20 text-center mx-autopx-3 py-1 rounded-full text-sm flex justify-center items-center gap-1 ${statusToDisplay.className}`}
    >
      {statusToDisplay.label}
    </span>
  );
};

export default MissionStatusTag;
