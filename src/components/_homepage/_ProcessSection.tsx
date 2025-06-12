import { TrendingUp, Users, Shield, Code2 } from "lucide-react";
import { AnimatedBlock } from "../displayElements/AnimatedBlock";
import ExploreProjectButton from "../buttons/ExploreProjectButton";
import ApplyButton from "../buttons/ApplyButton";

const features = [
  {
    icon: <TrendingUp className="text-accent w-8 h-8 mb-4" />,
    title: "The best projects",
    desc: "The preselection is done by beFUNDR and its partners, but the final decision is made by the community",
  },
  {
    icon: <Users className="text-accent w-8 h-8 mb-4" />,
    title: "Full community support",
    desc: "Community members can fund and contribute to projects thanks to the Skills Hub",
  },
  {
    icon: <Shield className="text-accent w-8 h-8 mb-4" />,
    title: "Smooth & fair",
    desc: "Seamless launch, transparent process, fair valuation",
  },
  {
    icon: <Code2 className="text-accent w-8 h-8 mb-4" />,
    title: "For real builders",
    desc: "No place for fake projects, only the best builders, from the strongest communities",
  },
];

const ProcessSection = () => {
  return (
    <AnimatedBlock className="relative flex flex-col w-full mt-8 overflow-hidden">
      {/* SVG background */}
      <div className="container mx-auto flex flex-col gap-12 py-16 px-4 relative z-10">
        <h1 className="h1Style mb-8">
          <strong className="text-accent">Incubation empowered</strong> by
          communities
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className=" border border-custom-gray-800 rounded-3xl p-6 flex flex-col items-start shadow-md min-h-[260px]"
            >
              {feature.icon}
              <h2 className="h2Style text-white mb-2">{feature.title}</h2>
              <p className="bodyStyle">{feature.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <ExploreProjectButton />
          <ApplyButton />
        </div>
      </div>
    </AnimatedBlock>
  );
};

export default ProcessSection;
