const mockContributions = [
  {
    title: "Helped launch the MonkeDAO website",
    description: "Worked on the front-end and smart contract integration.",
    date: "2023-11-01",
  },
  {
    title: "Organized a community event",
    description: "Set up a virtual hackathon for DAO members.",
    date: "2023-09-15",
  },
  {
    title: "Wrote a technical article",
    description: "Published a guide on Solana staking.",
    date: "2023-08-10",
  },
];

const UserContributionsContent = () => {
  return (
    <div className="flex flex-col gap-6 mt-4">
      {mockContributions.map((contrib, idx) => (
        <div
          key={idx}
          className="bg-custom-gray-900 rounded-2xl p-6 border border-custom-gray-700 shadow-lg"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-lg font-bold text-white">{contrib.title}</div>
            <div className="text-xs text-gray-400">{contrib.date}</div>
          </div>
          <div className="text-gray-300 text-sm">{contrib.description}</div>
        </div>
      ))}
    </div>
  );
};

export default UserContributionsContent;
