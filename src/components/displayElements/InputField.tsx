// src/components/profile/ProfileInput.tsx
import React from "react";

type Props = {
  label: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  type?: string;
  textarea?: boolean;
  required?: boolean;
};

export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  required = false,
}: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 bodyStyle">
        {label} {required && "*"}
      </label>
      {textarea ? (
        <textarea
          className="w-full rounded-lg bg-transparent border border-gray-500 px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
          value={value}
          onChange={onChange}
          rows={3}
        />
      ) : (
        <input
          type={type}
          className="w-full rounded-lg bg-transparent border border-gray-500 px-4 py-2 text-white focus:outline-none focus:border-cyan-400"
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
}
