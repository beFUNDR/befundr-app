import { Star } from "lucide-react";

type Props = {
  points: number;
};

const PointCard = (props: Props) => {
  return (
    <div className="bg-custom-gray-900 rounded-2xl p-4 flex  items-center justify-center gap-3 border border-custom-gray-800  max-w-xs mx-auto ">
      <Star className="text-third bg-third/30 rounded-full p-2" size={40} />
      <div className="flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{props.points}</span>
        <span className="text-sm text-custom-gray-400">Points</span>
      </div>
    </div>
  );
};

export default PointCard;
