import ButtonLabelSecondary from "@/components/buttons/_ButtonLabelSecondary";

type Props = {
  isOwner: boolean;
};

const VoteContent = (props: Props) => {
  return (
    <div className="flex flex-col justify-start items-center gap-4 h-[500px] overflow-y-auto px-2">
      {props.isOwner && (
        <button className="w-40">
          <ButtonLabelSecondary label="Add a vote" />
        </button>
      )}
      <div className="bodyStyle">
        There is no vote for this project at the moment
      </div>
    </div>
  );
};

export default VoteContent;
