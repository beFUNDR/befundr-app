// src/components/profile/ProfileMenu.tsx

const menuItems = [
  "My profile",
  "My projects",
  "My missions",
  "My applications",
  "My communities",
  "My investments",
];

export default function ProfileMenu({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (item: string) => void;
}) {
  return (
    <nav className="flex border-b border-gray-700 mb-8 overflow-x-auto">
      {menuItems.map((item) => (
        <button
          key={item}
          className={`px-4 py-2 text-base font-medium whitespace-nowrap ${
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
