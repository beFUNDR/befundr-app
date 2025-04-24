import LoaderSmall from "../LoaderSmall";

type Props = {
  label: string;
  isLoading: boolean;
};

const ButtonLabelAsync = (props: Props) => {
  return props.isLoading ? (
    <div className="bg-white rounded-xl px-4 py-2 w-full transition-all duration-300 min-w-48 min-h-10 flex items-center justify-center">
      <LoaderSmall />
    </div>
  ) : (
    <div className="bg-white hover:bg-black text-black hover:text-white  rounded-xl px-4 py-2 w-full transition-all duration-300 min-w-48 min-h-10">
      {props.label}
    </div>
  );
};

export default ButtonLabelAsync;
