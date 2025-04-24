"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  textToCopy: string;
};

const CopyPasteButton = (props: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyAddress = () => {
    if (props.textToCopy) {
      navigator.clipboard
        .writeText(props.textToCopy)
        .then(() => {
          console.log("Address copied to clipboard");
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
        });
    }
  };

  return (
    <button onClick={handleCopyAddress}>
      {isCopied ? <Check size={16} color="green" /> : <Copy size={16} />}
    </button>
  );
};

export default CopyPasteButton;
