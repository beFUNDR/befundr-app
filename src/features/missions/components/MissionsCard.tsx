type Props = {
  title: string;
};

export const MissionsCard = ({ title }: Props) => {
  return <div className="rounded border p-4 shadow">{title}</div>;
};
