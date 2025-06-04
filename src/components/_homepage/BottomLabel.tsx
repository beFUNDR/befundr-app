import { AnimatedBlock } from "../displayElements/AnimatedBlock";
import ExploreProjectButton from "../buttons/ExploreProjectButton";
import ApplyButton from "../buttons/ApplyButton";

const BottomLabel = () => {
  return (
    <AnimatedBlock className="relative flex flex-col w-full mt-8 overflow-hidden bg-custom-gray-900">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2 py-16 px-4 relative z-10">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="h1Style text-white mb-2">
            Fund and contribute to the next Alpha
          </h2>
          <p className="bodyStyle text-[#b6f7f7] max-w-xl">
            Join beFUNDR, the decentralized incubator.
            <br /> Created for builders, backed by communities
          </p>
        </div>
        <div className="flex flex-col  gap-4 mt-6 md:mt-0 w-full md:w-auto">
          <ExploreProjectButton />
          <ApplyButton />
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default BottomLabel;
