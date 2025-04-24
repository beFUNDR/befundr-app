type Props = {
  label: string;
};

const ButtonLabelSecondary = (props: Props) => {
  return (
    <div className="bg-black text-white border border-neutral-500 hover:border-black min-w-48 min-h-10 rounded-xl px-4 py-2 w-full transition-all duration-300">
      {props.label}
    </div>
  );
};

export default ButtonLabelSecondary;
