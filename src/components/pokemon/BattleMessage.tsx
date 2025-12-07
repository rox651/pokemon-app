import { useEffect, useState } from "react";
import {
   BATTLE_ATTACKING_MESSAGE_DURATION,
   BATTLE_WIN_LOSE_MESSAGE_DURATION,
} from "@/domain/entities/constant";

type BattleMessageType = "attacking" | "win" | "lose";

interface BattleMessageProps {
   type: BattleMessageType | null;
}

const BattleMessage = ({ type }: BattleMessageProps) => {
   const [isVisible, setIsVisible] = useState(false);
   const [shouldRender, setShouldRender] = useState(false);

   useEffect(() => {
      let fadeInTimer: NodeJS.Timeout;
      let hideTimer: NodeJS.Timeout;
      let removeTimer: NodeJS.Timeout;

      if (!type) {
         setIsVisible(false);
         // Delay removal to allow fade-out animation
         removeTimer = setTimeout(() => {
            setShouldRender(false);
         }, 300);
         return () => {
            clearTimeout(removeTimer);
         };
      }

      setShouldRender(true);
      // Small delay to trigger fade-in animation
      fadeInTimer = setTimeout(() => {
         setIsVisible(true);
      }, 10);

      const duration =
         type === "attacking"
            ? BATTLE_ATTACKING_MESSAGE_DURATION
            : BATTLE_WIN_LOSE_MESSAGE_DURATION;

      hideTimer = setTimeout(() => {
         setIsVisible(false);
         // Remove from DOM after fade-out
         removeTimer = setTimeout(() => {
            setShouldRender(false);
         }, 300);
      }, duration);

      return () => {
         clearTimeout(fadeInTimer);
         clearTimeout(hideTimer);
         clearTimeout(removeTimer);
      };
   }, [type]);

   if (!type || !shouldRender) {
      return null;
   }

   const getMessage = () => {
      switch (type) {
         case "attacking":
            return "Attacking!";
         case "win":
            return "You Win!";
         case "lose":
            return "You Lose!";
         default:
            return "";
      }
   };

   const getColorClasses = () => {
      switch (type) {
         case "attacking":
            return "bg-gray-900 text-white";
         case "win":
            return "bg-green-500 text-white";
         case "lose":
            return "bg-red-500 text-white";
         default:
            return "";
      }
   };

   return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none p-4">
         <div
            className={`${getColorClasses()} px-6 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6 rounded-xl sm:rounded-2xl shadow-2xl text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold transition-all duration-300 ease-out ${
               isVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-90 -translate-y-4"
            }`}
         >
            {getMessage()}
         </div>
      </div>
   );
};

export default BattleMessage;
