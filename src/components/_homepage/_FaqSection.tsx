import { AnimatedBlock } from "../displayElements/AnimatedBlock";
import FaqQuestionCard from "../cards/FaqQuestionCard";

const FaqSection = () => {
  return (
    <AnimatedBlock className="relative flex flex-col w-full mt-8 overflow-hidden">
      <div className="container mx-auto flex flex-col gap-2 py-16 px-4 relative z-10">
        <h1 className="h1Style mb-10">FAQ</h1>
        <FaqQuestionCard question="How is beFUNDR different from traditional incubators?">
          <p>
            beFUNDR is a crowdfunding platform that allows you to raise funds
            from the community. It is different from traditional incubators
            because it is a community-driven platform that allows you to raise
            funds from the community.
          </p>
          <p>
            beFUNDR is a crowdfunding platform that allows you to raise funds
            from the community. It is different from traditional incubators
            because it is a community-driven platform that allows you to raise
            funds from the community.
          </p>
        </FaqQuestionCard>
        <FaqQuestionCard question="How is beFUNDR different from traditional incubators?">
          <p>
            beFUNDR is a crowdfunding platform that allows you to raise funds
            from the community. It is different from traditional incubators
            because it is a community-driven platform that allows you to raise
            funds from the community.
          </p>
          <p>
            beFUNDR is a crowdfunding platform that allows you to raise funds
            from the community. It is different from traditional incubators
            because it is a community-driven platform that allows you to raise
            funds from the community.
          </p>
        </FaqQuestionCard>
      </div>
    </AnimatedBlock>
  );
};

export default FaqSection;
