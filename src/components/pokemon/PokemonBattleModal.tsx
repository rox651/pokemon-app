import { useRef } from "react";
import { useClickOutside } from "@/hooks/common/useClickOutside";
import useStore from "@/store";
import PokemonFighterView from "./PokemonFighterView";

const PokemonBattleModal = () => {
   const modalRef = useRef<HTMLDivElement | null>(null);
   const pokemonFromPlayer = useStore(state => state.pokemonFromPlayer);
   const setStatus = useStore(state => state.setStatus);

   const onClose = () => {
      setStatus("idle");
   };

   useClickOutside(modalRef as React.RefObject<HTMLElement>, () => onClose());

   if (!pokemonFromPlayer) {
      return null;
   }

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-scroll">
         <div
            ref={modalRef}
            className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl grid grid-cols-2 gap-8 items-start"
         >
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]">
               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 flex items-center justify-center shadow-lg ring-4 ring-white">
                  <span className="text-white font-extrabold text-xl drop-shadow">VS</span>
               </div>
            </div>
            <PokemonFighterView isPlayer pokemon={pokemonFromPlayer} />
            <PokemonFighterView pokemon={pokemonFromPlayer} />
            <div className="col-span-2 flex justify-center mt-2">
               <button
                  onClick={onClose}
                  className="cursor-pointer px-5 py-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold transition-colors"
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
};

export default PokemonBattleModal;
