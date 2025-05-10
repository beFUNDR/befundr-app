import { Search, Users, DollarSign } from "lucide-react";

const features = [
  {
    icon: <Search className=" w-5 h-5 mr-3 text-secondary" />,
    text: (
      <p className="bodyStyle">
        Builders, kickstart your project with a seamless launch experience.
      </p>
    ),
  },
  {
    icon: <DollarSign className="text-secondary w-5 h-5 mr-3" />,
    text: (
      <p className="bodyStyle">
        Investors, fund early with confidence the top builders.
      </p>
    ),
  },
  {
    icon: <Users className="text-secondary w-5 h-5 mr-3" />,
    text: (
      <p className="bodyStyle">
        Partners, cut the noise. Focus on builders that matter..
      </p>
    ),
  },
];

const FeaturesList = () => (
  <ul className="flex flex-col gap-3">
    {features.map((feature, idx) => (
      <li key={idx} className="flex items-center text-lg">
        {feature.icon}
        {feature.text}
      </li>
    ))}
  </ul>
);

export default FeaturesList;
