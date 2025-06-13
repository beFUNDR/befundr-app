import LoaderSmall from "../displayElements/LoaderSmall";

type Props = {
  label: string;
  isLoading: boolean;
};

const ButtonLabelSecondaryAsync = (props: Props) => {
  return (
    <div className="flex justify-center items-center  border-2 border-accent text-accent whitespace-nowrap font-bold rounded-full px-2 py-3 text-lg min-w-48 min-h-10 hover:opacity-50 transition-all ease-in-out duration-300 cursor-pointer">
      {props.isLoading ? <LoaderSmall /> : props.label}
    </div>
  );
};

export default ButtonLabelSecondaryAsync;
