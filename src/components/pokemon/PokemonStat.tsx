import { cn } from "@/helpers/common/cn";
import React from "react";
import {
   GiHeartPlus,
   GiBroadsword,
   GiShield,
   GiMagicSwirl,
   GiMagicShield,
   GiRunningShoe,
} from "react-icons/gi";

interface PokemonStatProps {
   name: string;
   value: number;
   max?: number;
}

const DEFAULT_MAX = 100;

const DEFAULT_MIN_HIGH_VALUE = 70;
const DEFAULT_MIN_MID_VALUE = 40;

const statIcons: Record<string, React.ReactNode> = {
   HP: <GiHeartPlus className="text-red-400" />,
   ATK: <GiBroadsword className="text-orange-400" />,
   DEF: <GiShield className="text-yellow-500" />,
   SpA: <GiMagicSwirl className="text-blue-400" />,
   SpD: <GiMagicShield className="text-green-400" />,
   SPD: <GiRunningShoe className="text-pink-400" />,
};

const barColors = {
   high: "bg-green-400",
   mid: "bg-yellow-300",
   low: "bg-red-400",
};

const PokemonStat: React.FC<PokemonStatProps> = ({ name, value, max = DEFAULT_MAX }) => {
   const percent = Math.min(100, Math.round((value / max) * 100));
   let barColor = barColors.low;

   if (percent > DEFAULT_MIN_HIGH_VALUE) barColor = barColors.high;
   else if (percent > DEFAULT_MIN_MID_VALUE) barColor = barColors.mid;

   return (
      <div className={cn("flex flex-col gap-1 w-full", name === "HP" ? "col-span-full" : "")}>
         <div className="flex items-center justify-between text-xs font-medium mb-1">
            <div className="flex items-center gap-1">
               <span className="text-3xl">{statIcons[name]}</span>
               <span className="font-semibold text-gray-700">{name}</span>
            </div>
            <span className="font-bold text-gray-900">{value}</span>
         </div>
         <div className="w-full h-3 bg-gray-200 rounded-full shadow-inner overflow-hidden">
            <div
               className={`h-3 rounded-full transition-all duration-300 ${barColor}`}
               style={{ width: `${percent}%` }}
            />
         </div>
      </div>
   );
};

export default PokemonStat;
