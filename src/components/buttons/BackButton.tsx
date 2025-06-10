"use client";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  link?: string;
}

const BackButton = (props: Props) => {
  const router = useRouter();

  return (
    <button
      onClick={() => (props.link ? router.push(props.link) : router.back())}
      className="flex items-center gap-2 mb-6"
    >
      <ArrowLeftIcon className="w-6 h-6" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};

export default BackButton;
