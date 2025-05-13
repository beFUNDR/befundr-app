interface Tab {
  id: string;
  label: string;
}

const TABS: Tab[] = [
  { id: "projects", label: "Projects" },
  { id: "missions", label: "Missions done" },
  { id: "communities", label: "Communities" },
];

interface UserTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const UserTabs = ({ activeTab, onTabChange }: UserTabsProps) => {
  return (
    <div className="flex gap-8 border-b border-custom-gray-600 mb-6 mt-8">
      {TABS.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`pb-2 px-2 text-white cursor-pointer border-b-2 transition-all ${
            activeTab === tab.id
              ? "border-accent"
              : "border-transparent hover:border-custom-gray-400 text-custom-gray-400 hover:text-custom-gray-200"
          }`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default UserTabs;
