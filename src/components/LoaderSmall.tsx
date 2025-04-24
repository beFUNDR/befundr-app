import { LoaderCircle } from "lucide-react";

const LoaderSmall = ({ color = "black" }: { color?: "black" | "white" }) => {
  return <LoaderCircle size={20} color={color} className="animate-spin" />;
};

export default LoaderSmall;
