import { useGetPokemonsMoves } from "@/hooks/pokemon/useGetPokemonMoves";
import { getPokemonTypeColor } from "@/helpers/pokemon/pokemonTypes";
import type { Move, PokemonAdapted } from "@/domain/entities/pokemon";
import { GiBroadsword, GiMagicSwirl } from "react-icons/gi";
import { MdAutoFixHigh } from "react-icons/md";
import type { ReactNode } from "react";
import useStore from "@/store";
import { useBattleStatus } from "@/hooks/pokemon/useBattleStatus";

interface PokemonMovesProps {
   pokemon: PokemonAdapted;
}

const categoryIcon: Record<string, ReactNode> = {
   physical: <GiBroadsword className="text-orange-400" />,
   special: <GiMagicSwirl className="text-blue-400" />,
   status: <MdAutoFixHigh className="text-purple-400" />,
};

export const PokemonMoves = ({ pokemon }: PokemonMovesProps) => {
   const attack = useStore(state => state.attack);
   const pokemonMoves = pokemon.moves.map(m => m.move.name);
   const { data: moves, isLoading: isLoadingMoves } = useGetPokemonsMoves(
      pokemon.name,
      pokemonMoves
   );

   const { isAttacking, isWin, isLose } = useBattleStatus();

   const isDisabled = isAttacking || isWin || isLose;

   const onClickMove = (move: Move) => {
      if (isDisabled) return;

      const pokemonMove = pokemon.moves.find(m => m.move.name === move.name);

      if (!pokemonMove) return;

      attack(pokemonMove);
   };

   return (
      <div className="flex flex-col gap-3">
         <div className="flex items-center gap-2">
            <span className="font-bold text-gray-800">Moves</span>
            <span className="text-[10px] px-2 py-[2px] rounded-full bg-gray-200 text-gray-700">
               {pokemonMoves.length}
            </span>
         </div>
         {isLoadingMoves ? (
            <div className="flex items-center gap-2 text-sm text-gray-600">
               <span className="animate-pulse">Loading moves...</span>
            </div>
         ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {moves?.map(move => {
                  const power = move.power ?? "-";
                  const accuracy = move.accuracy ?? "—";
                  const pp = move.pp ?? "—";
                  const typeColor = getPokemonTypeColor(move.type);

                  return (
                     <button
                        key={move.name}
                        className="cursor-pointer rounded-lg border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow duration-200 disabled:cursor-not-allowed disabled:opacity-50 "
                        onClick={() => onClickMove(move)}
                        disabled={isDisabled}
                     >
                        <div className="flex items-center justify-between mb-2">
                           <div className="flex items-center gap-2">
                              <span className="text-xl">
                                 {categoryIcon[move.damage_class.name]}
                              </span>
                              <span className="font-semibold text-gray-900 capitalize text-ellipsis">
                                 {move.name}
                              </span>
                           </div>
                           <span
                              className="text-[10px] font-bold uppercase text-white px-2 py-[2px] rounded"
                              style={{ backgroundColor: typeColor }}
                           ></span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-[11px]">
                           <div className="rounded bg-gray-100 px-2 py-1 text-gray-700 text-center">
                              <span className="block font-semibold truncate text-ellipsis">
                                 Power
                              </span>
                              <span>{power}</span>
                           </div>
                           <div className="rounded bg-gray-100 px-2 py-1 text-gray-700 text-center">
                              <span className="block font-semibold truncate text-ellipsis">
                                 Accuracy
                              </span>
                              <span>{accuracy}</span>
                           </div>
                           <div className="rounded bg-gray-100 px-2 py-1 text-gray-700 text-center">
                              <span className="block font-semibold truncate text-ellipsis">PP</span>
                              <span>{pp}</span>
                           </div>
                        </div>
                     </button>
                  );
               })}
            </div>
         )}
      </div>
   );
};
