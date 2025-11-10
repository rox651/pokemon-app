import type { PokemonAdapted } from "@/domain/entities/pokemon";
import useStore from "@/store";
import { cn } from "@/helpers/common/cn";

interface PokemonCardViewProps {
   pokemon: PokemonAdapted;
   onSelect?: (pokemon: PokemonAdapted) => void;
}

const PokemonCardView = ({ pokemon, onSelect }: PokemonCardViewProps) => {
   const setStatus = useStore(state => state.setStatus);
   const setPokemonFromPlayer = useStore(state => state.setPokemonFromPlayer);

   const onClickPlay = () => {
      setStatus("playing");
      setPokemonFromPlayer(pokemon);
   };

   return (
      <button
         onClick={() => {
            onSelect?.(pokemon);
         }}
         className={cn(
            "flex  flex-col items-center pt-20 p-4 border group border-gray-500/10  rounded-xl shadow relative"
         )}
      >
         <div className={cn("cursor-pointer")}>
            <h3 className="text-gray-400 text-2xl  font-bold mb-2 right-5 top-5 absolute">
               #{pokemon.id}
            </h3>
            <img
               className="w-24 h-24 object-contain transition-transform group-hover:-rotate-10 group-hover:scale-180   scale-150  "
               src={pokemon.sprites.front_default}
               alt={pokemon.name}
            />
            <h3 className="relative z-10 text-lg capitalize mb-3 font-black group-hover:rotate-5 transition-all group-hover:-translate-y-1 border border-gray-300 group-hover:bg-blue-300 px-3 rounded-xl">
               {pokemon.name}
            </h3>
         </div>
         <div
            onClick={e => {
               e.stopPropagation();
               onClickPlay();
            }}
            className="mt-10 cursor-pointer text-sm text-gray-800 font-semibold bg-gray-300 px-5 py-2 rounded-full"
         >
            Play with this Pokemon
         </div>
      </button>
   );
};

export default PokemonCardView;
