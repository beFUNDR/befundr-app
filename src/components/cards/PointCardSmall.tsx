import { Star } from "lucide-react";

type Props = {
  points: number;
};

const PointCardSmall = (props: Props) => {
  return (
    <div className=" rounded-full  flex px-2 py-1  items-center justify-center gap-2 border border-third mx-auto ">
      <Star className="text-third bg-third/30 p-1 rounded-full " size={20} />
      <span className="text-base font-bold text-third">{props.points}</span>
    </div>
  );
};

export default PointCardSmall;
