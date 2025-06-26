"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { AnimatedBlock } from "@/components/displayElements/AnimatedBlock";

interface FaqQuestionProps {
  question: string;
  children: React.ReactNode;
}

const FaqQuestionCard = ({ question, children }: FaqQuestionProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`w-full mb-6 border rounded-3xl transition-all duration-300 bg-black/70 ${
        open ? "border-accent" : "border-custom-gray-800"
      }`}
    >
      <button
        className="flex w-full items-center justify-between px-4 md:px-8 py-3 md:py-6 focus:outline-none"
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
      <AnimatedBlock show={open} className="px-4 md:px-8">
        <div className="text-body-text text-lg py-4 pb-6">{children}</div>
      </AnimatedBlock>
    </div>
  );
};

export default FaqQuestionCard;
