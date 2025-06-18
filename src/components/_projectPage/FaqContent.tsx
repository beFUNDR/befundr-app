import FaqQuestionCard from "@/components/cards/FaqQuestionCard";

const FaqContent = () => {
  return (
    <div className="flex flex-col gap-4 h-[500px] overflow-y-auto px-2">
      <FaqQuestionCard question="What problem does this project solve?">
        <p>
          Our project addresses a common pain point in the Web3 space: lack of
          accessible, user-friendly tools for newcomers. By simplifying
          interactions and reducing friction, we aim to onboard the next wave of
          users and contributors to the decentralized ecosystem.
        </p>
      </FaqQuestionCard>

      <FaqQuestionCard question="How will the funds be used after the kickstart phase?">
        <p>
          The initial funds will be allocated to product development, smart
          contract audits, community building, and launching key features.
          Transparency is core to our mission — a detailed funding roadmap will
          be published and regularly updated.
        </p>
      </FaqQuestionCard>
    </div>
  );
};

export default FaqContent;
