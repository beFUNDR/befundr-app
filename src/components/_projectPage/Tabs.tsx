const TABS = [
  { id: "about", label: "About", count: 0 },
  { id: "updates", label: "Updates", count: 0 },
  { id: "missionHub", label: "Mission Hub", count: 2 },
  { id: "vote", label: "Vote", count: 0 },
  { id: "faq", label: "FAQ", count: 0 },
];

type Props = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

const Tabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className="flex gap-8 border-b border-custom-gray-600 mb-6">
      {TABS.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-2 px-2 text-white cursor-pointer border-b-2 ${
            activeTab === tab.id ? "border-accent" : "border-transparent"
          }`}
        >
          {tab.label}
          {tab.count > 0 && (
            <span className="ml-1 text-xs bg-custom-gray-800 px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
