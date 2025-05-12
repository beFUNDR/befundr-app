import FaqQuestionCard from "../cards/FaqQuestionCard";

type Props = {};

const FaqContent = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 h-[500px] overflow-y-auto px-2">
      <FaqQuestionCard question="How is beFUNDR different from traditional incubators?">
        <p>
          beFUNDR is a crowdfunding platform that allows you to raise funds from
          the community. It is different from traditional incubators because it
          is a community-driven platform that allows you to raise funds from the
          community.
        </p>
        <p>
          beFUNDR is a crowdfunding platform that allows you to raise funds from
          the community. It is different from traditional incubators because it
          is a community-driven platform that allows you to raise funds from the
          community.
        </p>
      </FaqQuestionCard>
      <FaqQuestionCard question="How is beFUNDR different from traditional incubators?">
        <p>
          beFUNDR is a crowdfunding platform that allows you to raise funds from
          the community. It is different from traditional incubators because it
          is a community-driven platform that allows you to raise funds from the
          community.
        </p>
        <p>
          beFUNDR is a crowdfunding platform that allows you to raise funds from
          the community. It is different from traditional incubators because it
          is a community-driven platform that allows you to raise funds from the
          community.
        </p>
      </FaqQuestionCard>
    </div>
  );
};

export default FaqContent;
