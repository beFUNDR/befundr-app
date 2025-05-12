const mockDaos = [
  {
    name: "MonkeDAO",
    description: "The premier Web3 country club.",
    logo: "/images/daos/monkedao.png", // Remplace par une image réelle si besoin
  },
  {
    name: "MonkeDAO",
    description: "The premier Web3 country club.",
    logo: "/images/daos/monkedao.png",
  },
  {
    name: "MonkeDAO",
    description: "The premier Web3 country club.",
    logo: "/images/daos/monkedao.png",
  },
  {
    name: "MonkeDAO",
    description: "The premier Web3 country club.",
    logo: "/images/daos/monkedao.png",
  },
];

const UserDAOsContent = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4">
      {mockDaos.map((dao, idx) => (
        <div
          key={idx}
          className="bg-custom-gray-900 rounded-2xl p-6 flex flex-col items-center border border-custom-gray-700 shadow-lg"
        >
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-4">
            <img
              src={dao.logo}
              alt={dao.name}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div className="text-xl font-bold text-white mb-1">{dao.name}</div>
          <div className="text-gray-300 text-center text-sm">
            {dao.description}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserDAOsContent;
