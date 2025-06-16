type Props = {
  label: string;
  children?: React.ReactNode;
};

const ButtonLabelAlertSmall = (props: Props) => {
  return (
    <div className="flex justify-center gap-2 items-center border-2 border-red-500 text-red-500 font-bold whitespace-nowrap min-w-48 px-2 py-1 rounded-full  w-full hover:opacity-50 transition-all duration-300 ">
      <span className="ml-2">{props.label}</span> {props.children}
    </div>
  );
};

export default ButtonLabelAlertSmall;
