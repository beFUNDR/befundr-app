import LoaderSmall from "../displayElements/LoaderSmall";
import React from "react";

// On reprend la structure et le style de ButtonLabel
const baseClass =
  "flex justify-center items-center bg-accent text-black font-bold rounded-full px-2 py-3 text-lg min-w-48 min-h-12 hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer";

type Props = {
  label: string;
  isLoading: boolean;
  children?: React.ReactNode;
};

const ButtonLabelAsync = (props: Props) => {
  return (
    <div className={baseClass}>
      {props.isLoading ? (
        <LoaderSmall />
      ) : (
        <span className="ml-2">{props.label}</span>
      )}
      {props.children}
    </div>
  );
};

export default ButtonLabelAsync;
