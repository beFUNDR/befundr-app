type Props = {
  label: string;
};

const ButtonLabelSecondarySmall = (props: Props) => {
  return (
    <div className="flex justify-center items-center  border-2 border-accent text-accent font-bold rounded-full px-2 py-1 text-base  hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer">
      {props.label}
    </div>
  );
};

export default ButtonLabelSecondarySmall;
