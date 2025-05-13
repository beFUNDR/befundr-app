import React from "react";

type Props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
};

export default function Selector({
  label,
  value,
  onChange,
  options,
  required = false,
}: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 bodyStyle">
        {label} {required && "*"}
      </label>
      <select
        className="w-full rounded-lg bg-transparent border border-gray-500 px-4 py-2 text-white focus:outline-none focus:border-accent"
        value={value}
        onChange={onChange}
        required={required}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
