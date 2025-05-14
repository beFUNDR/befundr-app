import React from "react";

type Props = {
  children: React.ReactNode;
};

const AlertMessage = (props: Props) => {
  return (
    <div className="border border-red-400 text-red-400 rounded-lg p-3 text-sm">
      {props.children}
    </div>
  );
};

export default AlertMessage;
