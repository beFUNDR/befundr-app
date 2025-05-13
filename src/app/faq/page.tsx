import FaqQuestionCard from "@/components/cards/FaqQuestionCard";

type Props = {};

const FaqPage = (props: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 ">
      <h1 className="h1Style my-6">Frequently Asked Questions</h1>
      <p className="bodyStyle max-w-xl mb-10">
        You can find here the most common questions about beFUNDR.
      </p>
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

export default FaqPage;
