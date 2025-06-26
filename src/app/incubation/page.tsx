import ButtonLabel from "@/components/buttons/_ButtonLabel";
import ExploreProjectButton from "@/components/buttons/ExploreProjectButton";
import Image from "next/image";
import Link from "next/link";

const IncubationPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12">
      {/* intro */}
      <h1 className="h1Style my-6">
        beFUNDR leads you from{" "}
        <strong className="text-accent">Easy Start</strong> to{" "}
        <strong className="text-accent">Real Growth</strong>
      </h1>
      <div className="bodyStyle w-full mb-10 flex flex-col gap-4">
        <p>
          As a founder, the hardest step is to get started. beFUNDR is designed
          to make this first step as easy as possible.
        </p>
        <p>
          By merging a professional and tailored guidance with a community
          layer, beFUNDR redefines the incubation code.
        </p>
        <p>
          By decentralizing the complete process, selection, incubation and
          funding, we&apos;re help you to create your early supporter base.
        </p>
        <p>Discover our process 👇</p>
      </div>
      {/* selection */}
      <h2 className="h2Style my-6">
        <strong className="text-accent">Market Driven</strong> project selection
      </h2>
      <div className="bodyStyle w-full mb-10 flex flex-col gap-4">
        <p>
          After a pre-selection by our partners, the final say goes to the
          community. <br />
          The selection process is coupled with a kickstart funding round:
          projects that sell the most early adopter NFTs earn their place in the
          upcoming incubation batch. A minimum of $50k sale is also required to
          insure a good incubation.
        </p>
        <p className="font-bold">Real demand means real validation.</p>
        <p>
          Selected builders get: Early traction proof, An engaged first
          community, Initial funds to start building
        </p>
      </div>
      <div className="flex w-full md:w-48">
        <ExploreProjectButton />
      </div>
      <Image
        src="/images/incubation-process/incubation-selection.png"
        alt="befundr funding process"
        width={500}
        height={500}
        className="w-full md:w-2/3 mx-auto my-6"
      />
      {/* incubation */}
      <h2 className="h2Style mt-14 mb-6">
        <strong className="text-accent">Community-enhanced </strong>incubation
      </h2>
      <div className="bodyStyle w-full mb-10 flex flex-col gap-4">
        <p>
          Partners bring structure, tools, and tailored guidance. But the
          community brings life.
        </p>
        <p>
          You need a specific support? Create a mission, define the condition
          (payed or not), then receive and assess applications from the
          community.
        </p>
        <p>
          <strong>Supporting on beFUNDR is not just about capital.</strong>{" "}
          It&apos;s about skills, engagement, and contribution.
        </p>
      </div>
      <Link href="/partners" className="flex w-full md:w-48 ">
        <ButtonLabel label="Discover our partners" />
      </Link>
      <Image
        src="/images/incubation-process/incubation-incubation.png"
        alt="befundr funding process"
        width={500}
        height={500}
        className="w-full md:w-2/3 mx-auto my-6"
      />
      {/* funding */}
      <h2 className="h2Style mt-14 mb-6">
        <strong className="text-accent">Fair and open </strong>fundraising
      </h2>
      <div className="bodyStyle w-full mb-10 flex flex-col gap-4">
        <p>
          We are convinced that the funding landscape evolving fast, driven by
          aim of fairness and transaparency.
        </p>
        <p>
          At beFUNDR, we fully embrace this vision! <br />
          Once again, decentralization is the way.
        </p>
        <p>
          We&apos;re have built a framework where VCs and retail investors can
          truly co-exist: No backdoors deals, no privileges for big players over
          smaller investors. Just a fair way to be early.
        </p>
        <p>
          After the kickstart NFT sale, VCs can contribute during incubation.
          Then comes the fully public, sequenced token sale:
        </p>
        <ul className="list-decimal list-inside">
          <li>Kickstart NFT holders (via airdrop)</li>
          <li>OG Solana communities</li>
          <li>General public</li>
        </ul>
        <p>
          Project valuation evolves naturally: <br />
          First through Kickstart NFT sales, then through strategic VC deals
          during incubation. <br />
          Finally, the public sale follows a light bonding curve, with part of
          the raised funds used to supply DEX liquidity pools.
        </p>
        <p>
          Fundraising can happen through the project&apos;s native token (when
          it makes sense) or via tokenized equity, depending on the nature of
          the project.
        </p>
      </div>
      <Image
        src="/images/incubation-process/incubation-fundraising.png"
        alt="befundr funding process"
        width={500}
        height={500}
        className="w-full md:w-2/3 mx-auto my-6"
      />
    </div>
  );
};

export default IncubationPage;
