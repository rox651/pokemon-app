import PokemonCardView from "./PokemonCardView";
import type { Pokemon } from "@/domain/entities/pokemon";

interface PokemonGridViewProps {
  pokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
}

const PokemonGridView = ({ pokemons, onSelect }: PokemonGridViewProps) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-20 mt-10 gap-x-4 p-4">
      {pokemons.map((pokemon) => (
        <PokemonCardView
          onSelect={onSelect}
          key={pokemon.id}
          pokemon={pokemon}
        />
      ))}
    </section>
  );
};

export default PokemonGridView;
