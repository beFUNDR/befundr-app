const TABS = [
  { id: "about", label: "About" },
  { id: "updates", label: "Updates" },
  { id: "missionHub", label: "Mission Hub" },
  { id: "vote", label: "Vote" },
  { id: "faq", label: "FAQ" },
];

type Props = {
  activeTab: string;
  onTabChange: (tabId: string) => void;
};

const Tabs = ({ activeTab, onTabChange }: Props) => {
  return (
    <div className="flex gap-8 border-b border-custom-gray-600 mb-6 overflow-x-auto">
      {TABS.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-2 px-2 text-white cursor-pointer text-center border-b-2 ${
            activeTab === tab.id ? "border-accent" : "border-transparent"
          }`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
