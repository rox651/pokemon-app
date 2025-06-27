import PokemonCardView from "@/components/pokemon/PokemonCardView";
import { type Row } from "@tanstack/react-table";
import type { PokemonAdapted } from "@/domain/entities/pokemon";

interface PokemonGridViewProps {
   pokemons: Row<PokemonAdapted>[];
   onSelect: (pokemon: PokemonAdapted) => void;
}

const PokemonGridView = ({ pokemons, onSelect }: PokemonGridViewProps) => {
   if (pokemons.length === 0) {
      return <div className="text-center text-3xl font-bold my-10">No pokemons found</div>;
   }

   return (
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-20 gap-x-4 p-4 mt-20">
         {pokemons.map(pokemon => (
            <PokemonCardView
               onSelect={onSelect}
               key={pokemon.original.id}
               pokemon={pokemon.original}
            />
         ))}
      </section>
   );
};

export default PokemonGridView;
