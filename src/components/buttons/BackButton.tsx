"use client";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};

const BackButton = (props: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 mb-6"
    >
      <ArrowLeftIcon className="w-6 h-6" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};

export default BackButton;
