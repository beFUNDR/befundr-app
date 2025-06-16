type Props = {
  label: string;
  children?: React.ReactNode;
};

const ButtonLabelAlert = (props: Props) => {
  return (
    <div className="flex justify-center gap-2 items-center border-2 border-red-500 text-red-500 font-bold whitespace-nowrap min-w-48 min-h-10  rounded-full px-4 py-2 w-full hover:opacity-50 transition-all duration-300 ">
      <span className="ml-2">{props.label}</span> {props.children}
    </div>
  );
};

export default ButtonLabelAlert;
