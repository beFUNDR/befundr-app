import ButtonLabel from "../buttons/_ButtonLabel";
import ButtonLabelSecondary from "../buttons/_ButtonLabelSecondary";
import Link from "next/link";
import { AnimatedBlock } from "../displayElements/AnimatedBlock";

const BottomLabel = () => {
  return (
    <AnimatedBlock className="relative flex flex-col w-full mt-8 overflow-hidden bg-custom-gray-800">
      <div className="container mx-auto flex justify-between items-center gap-2 py-16 px-4 relative z-10">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="h1Style text-white mb-2">Crowdfund with confidence</h2>
          <p className="bodyStyle text-[#b6f7f7] max-w-xl">
            Join BeFUNDR to discover, back, and launch Web3 projects with the
            power of DAOs and milestone-based funding.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/projects">
            <ButtonLabelSecondary label="Explore projects" />
          </Link>
          <Link href="/campaign">
            <ButtonLabel label="Start a campaign" />
          </Link>
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default BottomLabel;
