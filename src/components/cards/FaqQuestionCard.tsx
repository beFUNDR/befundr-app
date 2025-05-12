"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface FaqQuestionProps {
  question: string;
  children: React.ReactNode;
}

const FaqQuestionCard = ({ question, children }: FaqQuestionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`w-full mb-6 border rounded-3xl transition-all duration-300 ${
        open ? "border-accent" : "border-custom-gray-800"
      }`}
    >
      <button
        className="flex w-full items-center justify-between px-8 py-6 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="text-xl font-bold text-white text-left">
          {question}
        </span>
        {open ? (
          <ChevronDown className="text-accent w-7 h-7 transition-transform duration-300" />
        ) : (
          <ChevronRight className="text-accent w-7 h-7 transition-transform duration-300" />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 px-8 ${
          open ? "max-h-[1000px] py-2" : "max-h-0 py-0"
        }`}
      >
        {open && <div className="text-body-text text-lg pb-6">{children}</div>}
      </div>
    </div>
  );
};

export default FaqQuestionCard;
