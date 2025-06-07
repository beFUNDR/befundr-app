type Props = {
  label: string;
  children?: React.ReactNode;
};

const ButtonLabel = (props: Props) => {
  return (
    <div className="flex justify-center items-center bg-accent text-black whitespace-nowrap font-bold rounded-full px-2 py-3 text-lg min-w-48 min-h-10 hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer">
      <span className="ml-2">{props.label}</span> {props.children}
    </div>
  );
};

export default ButtonLabel;
