type Props = {
  label: string;
  children?: React.ReactNode;
};

const ButtonLabel = (props: Props) => {
  return (
    <div className="flex justify-center gap-2 items-center bg-white hover:bg-black text-black hover:text-white min-w-48 min-h-10  rounded-xl px-4 py-2 w-full transition-all duration-300 ">
      <span className="ml-2">{props.label}</span> {props.children}
    </div>
  );
};

export default ButtonLabel;
