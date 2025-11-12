import { useEffect, useRef } from "react";
import { useClickOutside } from "@/hooks/common/useClickOutside";
import useStore from "@/store";
import PokemonFighterView from "./PokemonFighterView";
import { useGetAllPokemons } from "@/hooks/pokemon/useGetAllPokemons";
import PokemonFighterViewSkeleton from "./PokemonFighterViewSkeleton";
import { generateRandomNumber } from "@/helpers/common/generateRandomNumber";
import { DEFAULT_BATTLE_DELAY } from "@/domain/entities/constant";
import { useBattleStatus } from "@/hooks/pokemon/useBattleStatus";
import BattleMessage from "./BattleMessage";

const PokemonBattleModal = () => {
   const modalRef = useRef<HTMLDivElement | null>(null);
   const { data: pokemons } = useGetAllPokemons();

   const pokemonFromPlayer = useStore(state => state.pokemonFromPlayer);
   const pokemonFromComputer = useStore(state => state.pokemonFromComputer);
   const setStatus = useStore(state => state.setStatus);
   const setPokemonFromComputer = useStore(state => state.setPokemonFromComputer);

   const { isPlaying, isWin, isLose, isAttacking } = useBattleStatus();

   const onClose = () => {
      setStatus("idle");
   };

   useClickOutside(modalRef as React.RefObject<HTMLElement>, () => onClose());

   useEffect(() => {
      if (!pokemons || pokemons.length === 0) return;
      let timeoutId: NodeJS.Timeout;

      const generateRandomPokemon = async () => {
         await new Promise(resolve => {
            timeoutId = setTimeout(resolve, DEFAULT_BATTLE_DELAY);
         });

         const randomPokemon = pokemons[generateRandomNumber(pokemons.length)];
         setPokemonFromComputer(randomPokemon);
      };

      generateRandomPokemon();

      return () => {
         clearTimeout(timeoutId);
         setPokemonFromComputer(null);
      };
   }, [setPokemonFromComputer, pokemons]);

   if (!pokemonFromPlayer) {
      return null;
   }

   const getBattleMessageType = (): "attacking" | "win" | "lose" | null => {
      if (isAttacking) return "attacking";
      if (isWin) return "win";
      if (isLose) return "lose";
      return null;
   };

   return (
      <div
         className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center 
    "
      >
         <BattleMessage type={getBattleMessageType()} />
         <div
            ref={modalRef}
            className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-5xl grid grid-cols-2 gap-8 items-center"
         >
            <div className="col-span-2 flex flex-col items-center">
               {isWin && <h1 className="text-4xl font-bold text-green-500">Win</h1>}
               {isPlaying && <h1 className="text-4xl font-bold text-gray-900">Battle</h1>}
               {isLose && <h1 className="text-4xl font-bold text-red-500">Lose</h1>}
               {isAttacking && <h1 className="text-4xl font-bold text-gray-900">Attacking</h1>}
            </div>
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[60%]">
               <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-yellow-400 flex items-center justify-center shadow-lg ring-4 ring-white">
                  <span className="text-white font-extrabold text-xl drop-shadow">VS</span>
               </div>
            </div>
            <PokemonFighterView isPlayer pokemon={pokemonFromPlayer} />
            {pokemonFromComputer ? (
               <PokemonFighterView pokemon={pokemonFromComputer} />
            ) : (
               <PokemonFighterViewSkeleton />
            )}
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
