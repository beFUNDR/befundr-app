import { AnimatedBlock } from "../displayElements/AnimatedBlock";
import FaqQuestionCard from "../cards/FaqQuestionCard";
import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import Link from "next/link";

const FaqSection = () => {
  return (
    <AnimatedBlock className="relative flex flex-col w-full mt-8 overflow-hidden">
      <div className="container mx-auto flex flex-col gap-2 py-16 px-4 relative z-10">
        <h1 className="h1Style mb-10">FAQ</h1>
        <FaqQuestionCard question="How can I apply to be incubated by beFUNDR?">
          <p>
            You can apply by submitting a short form on our website with your
            project description, team details, and current status. A selection
            phase will be done by beFUNDR and our partners
          </p>
          <p>
            Selected projects receive up to $100k in initial kickstart capital,
            access to a trusted community skills hub, and strategic support to
            prepare for a token or equity round.
          </p>
        </FaqQuestionCard>
        <FaqQuestionCard question="How do I invest in early projects on beFUNDR?">
          <p>
            Early access is granted via NFT drops representing your commitment
            to supporting promising projects. As a holder, you gain guaranteed
            allocation with any additional cost and exclusive access to extra
            early rounds of token or equity sales from incubated teams.
          </p>
          <p>
            These projects are selected and supported by trusted OG communities
            and Solana builders, increasing your chances of spotting
            high-potential teams early.
          </p>
        </FaqQuestionCard>
        <Link href="/faq" className="w-48">
          <ButtonLabelSecondary label="See all FAQ" />
        </Link>
      </div>
    </AnimatedBlock>
  );
};

export default FaqSection;
