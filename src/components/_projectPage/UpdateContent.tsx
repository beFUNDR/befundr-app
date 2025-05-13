import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import UpdateCard from "../cards/UpdateCard";

type Props = {
  isOwner: boolean;
};

const UpdateContent = (props: Props) => {
  // Mock d'un update
  const update: Update = {
    id: "1",
    title: "Starting the journey",
    authorId: "3zT4f1LdkoUF4aBALgTc6bzeTqxgPe2cAKkEayLAF1Kr",
    date: "2025-01-15",
    message:
      "beFUNDR is doing what it was made for. We're launching… on beFUNDR. Built by the community, for the community.",
    commentsCount: 11,
    likesCount: 25,
  };

  return (
    <div className="flex flex-col justify-start items-center space-y-8 h-[500px] overflow-y-auto px-2">
      {props.isOwner && (
        <button className="w-40">
          <ButtonLabelSecondary label="Add an update" />
        </button>
      )}
      <UpdateCard update={update} />
      <UpdateCard update={update} />
    </div>
  );
};

export default UpdateContent;
