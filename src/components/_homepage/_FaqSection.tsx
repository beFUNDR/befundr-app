import { AnimatedBlock } from "../displayElements/AnimatedBlock";
import FaqQuestionCard from "../cards/FaqQuestionCard";
import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import Link from "next/link";
import Image from "next/image";

const FaqSection = () => {
  return (
    <AnimatedBlock className="relative flex flex-col w-full mt-8 overflow-hidden">
      <div className="container mx-auto flex flex-col gap-2 py-16 px-4 relative z-10">
        <h1 className="h1Style mb-10">FAQ</h1>
        <FaqQuestionCard question="How does funding work on beFUNDR?">
          <p>
            Funding on beFUNDR happens in two key phases. First, selected
            projects receive up to <strong>$100k in kickstart funding</strong>,
            sourced from early adopters during an NFT sale. This gives builders
            the runway to prototype and engage their community.
          </p>
          <p>
            Then comes the <strong>incubation phase</strong>, supported by our
            Community Skills Hub — a curated network of mentors and
            contributors. After proving traction, projects move into a{" "}
            <strong>token or tokenized-equity sale</strong> conducted in 3
            rounds: first to NFT holders, then to OG communities, and finally to
            the public.
          </p>

          <Image
            src="/images/funding_process.png"
            alt="befundr funding process"
            width={500}
            height={500}
            className="w-full md:w-2/3 mx-auto my-6"
          />
        </FaqQuestionCard>
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
        <Link href="/faq" className="w-full md:w-48">
          <ButtonLabelSecondary label="See all FAQ" />
        </Link>
      </div>
    </AnimatedBlock>
  );
};

export default FaqSection;
