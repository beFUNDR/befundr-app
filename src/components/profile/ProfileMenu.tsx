// src/components/profile/ProfileMenu.tsx

const menuItems = [
  "My Profile",
  "My Projects",
  "My Contributions",
  "My DAOs",
  "My Points",
];

export default function ProfileMenu({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (item: string) => void;
}) {
  return (
    <nav className="flex border-b border-gray-700 mb-8">
      {menuItems.map((item) => (
        <button
          key={item}
          className={`px-4 py-2 text-base font-medium ${
            active === item
              ? "border-b-2 border-accent text-accent"
              : "text-white hover:text-accent"
          }`}
          onClick={() => onSelect(item)}
        >
          {item}
        </button>
      ))}
    </nav>
  );
}
