import Image from "next/image";

type Props = {
  image: string;
  name: string;
};

const NftCard = (props: Props) => {
  // split the name into collection and number
  let collection = props.name;
  let numero = "";
  if (props.name.includes("#")) {
    const [col, num] = props.name.split("#");
    collection = col.trim();
    numero = `#${num.trim()}`;
  }
  return (
    <div className=" flex flex-col items-center justify-center cursor-pointer  rounded-xl">
      <Image
        src={props.image}
        alt="Profile"
        width={100}
        height={100}
        className="object-cover rounded-xl hover:bg-custom-gray-400 p-1 transition-all duration-300 ease-in-out"
      />
      <p className="bodyStyle leading-tight text-center">
        {collection}
        <br />
        <span className="text-xs text-gray-400">{numero}</span>
      </p>
    </div>
  );
};

export default NftCard;
