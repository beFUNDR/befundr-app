import { TrendingUp, FileText, Link, CheckCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const stats = [
  {
    icon: <TrendingUp className="text-secondary w-8 h-8" />,
    value: 36000000,
    display: "$5M+",
    label: "Raised",
    isMoney: true,
  },
  {
    icon: <FileText className="text-secondary w-8 h-8" />,
    value: 200,
    display: "200+",
    label: "Active projects",
  },
  {
    icon: <Link className="text-secondary w-8 h-8" />,
    value: 50,
    display: "50+",
    label: "Engaged DAOs",
  },
  {
    icon: <CheckCircle className="text-secondary w-8 h-8" />,
    value: 95,
    display: "95%",
    label: "Milestone success",
    isPercent: true,
  },
];

function useCountTo(
  end: number,
  duration = 2000,
  isPercent = false,
  isMoney = false
) {
  const [value, setValue] = useState(0);
  const start = useRef(0);
  useEffect(() => {
    let startTimestamp: number | null = null;
    function step(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start.current + (end - start.current) * eased);
      setValue(current);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }, [end]);
  if (isPercent) return value + "%";
  if (isMoney) {
    if (value >= 1000000) return "$" + Math.round(value / 1000000) + "M+";
    if (value >= 1000) return "$" + Math.round(value / 1000) + "K+";
    return "$" + value;
  }
  return value + "+";
}

const StatCard = ({ icon, value, label, isPercent, isMoney }: any) => {
  const animatedValue = useCountTo(value, 2000, isPercent, isMoney);
  return (
    <div className=" border border-custom-gray-800 rounded-2xl p-6 flex flex-col items-start min-w-[180px] min-h-[120px] shadow-md">
      <div className="rounded-full bg-custom-gray-800 p-3 mb-2 flex items-center justify-center">
        {icon}
      </div>
      <div className="text-secondary text-3xl font-bold leading-tight">
        {animatedValue}
      </div>
      <div className="text-body-text text-base mt-1">{label}</div>
    </div>
  );
};

const StatsGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
    {stats.map((stat, idx) => (
      <StatCard key={idx} {...stat} />
    ))}
  </div>
);

export default StatsGrid;
