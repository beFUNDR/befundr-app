import FaqQuestionCard from "@/components/cards/FaqQuestionCard";
import Image from "next/image";

const FaqPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 md:px-8 lg:px-12 ">
      <h1 className="h1Style my-6">Frequently Asked Questions</h1>
      <p className="bodyStyle max-w-xl mb-10">
        You can find here the most common questions about beFUNDR.
      </p>
      <h2 className="h2Style mb-6">Builders</h2>
      <FaqQuestionCard question="How does funding work on beFUNDR?">
        <p>
          Funding on beFUNDR happens in two key phases. First, selected projects
          receive up to <strong>$100k in kickstart funding</strong>, sourced
          from early adopters during an NFT sale. This gives builders the runway
          to prototype and engage their community.
        </p>
        <p>
          Then comes the <strong>incubation phase</strong>, supported by our
          Community Skills Hub — a curated network of mentors and contributors.
          After proving traction, projects move into a{" "}
          <strong>token or tokenized-equity sale</strong> conducted in 3 rounds:
          first to NFT holders, then to OG communities, and finally to the
          public.
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

      <FaqQuestionCard question="Do I need a token to raise funds with beFUNDR?">
        <p>
          No. beFUNDR allows projects to raise initial capital without needing a
          live token. You can raise via a kickstart fund supported by the
          community and prepare for a token or equity sale later during the
          incubation.
        </p>
        <p>
          Our model is designed to support early builders and reduce pressure to
          launch prematurely.
        </p>
      </FaqQuestionCard>
      <h2 className="h2Style mb-6 mt-12">Investors</h2>
      <FaqQuestionCard question="How do I invest in early projects on beFUNDR?">
        <p>
          Early access is granted via NFT drops representing your commitment to
          supporting promising projects. As a holder, you gain guaranteed
          allocation with any additional cost and exclusive access to extra
          early rounds of token or equity sales from incubated teams.
        </p>
        <p>
          These projects are selected and supported by trusted OG communities
          and Solana builders, increasing your chances of spotting
          high-potential teams early.
        </p>
      </FaqQuestionCard>

      <FaqQuestionCard question="What are the risks of supporting early-stage projects?">
        <p>
          As with all early-stage investments, supporting projects on beFUNDR
          comes with risk. Some teams may not deliver or pivot.
        </p>
        <p>
          However, our community-focus approach and validation process reduce
          the risk by ensuring only credible builders with long-term vision
          receive funding.
        </p>
      </FaqQuestionCard>
      <h2 className="h2Style mb-6 mt-12">Communities</h2>
      <FaqQuestionCard question="How are OG communities involved in project selection?">
        <p>
          OG communities play a key role in assessing the reputation and
          credibility of applicants. Their input help determine which teams get
          kickstart funding and incubation support.
        </p>
        <p>
          This decentralized trust layer replaces the need for traditional
          gatekeepers and aligns incentives around real builder reputation.
        </p>
      </FaqQuestionCard>

      <FaqQuestionCard question="How can my community contribute to the beFUNDR ecosystem?">
        <p>
          Communities can contribute by curating talent, offering mentorship,
          and even co-incubating projects with local reach or technical
          expertise.
        </p>
        <p>
          Being active in beFUNDR opens doors to early project access and
          reputation-based influence across the ecosystem.
        </p>
      </FaqQuestionCard>
      <h2 className="h2Style mb-6 mt-12">Partners</h2>
      <FaqQuestionCard question="What kind of partners is beFUNDR looking for?">
        <p>
          We’re building a robust ecosystem of partners including auditors,
          infra providers, tokenomics experts, marketing experts, and DAO tools
          — anything that helps early builders grow sustainably.
        </p>
        <p>
          If you’re aligned with our mission to bring trust and long-term value
          back to Web3, we’d love to collaborate.
        </p>
      </FaqQuestionCard>

      <FaqQuestionCard question="How can my service or product support incubated teams?">
        <p>
          beFUNDR selects high-potential teams that often need Web3-native
          tools, security audits, growth support, and community engagement
          services. We match them with trusted partners.
        </p>
        <p>
          If you&apos;re interested in partnering with beFUNDR, please reach out
          on our X account and get access to incubated teams and visibility
          within the community.
        </p>
      </FaqQuestionCard>
    </div>
  );
};

export default FaqPage;
