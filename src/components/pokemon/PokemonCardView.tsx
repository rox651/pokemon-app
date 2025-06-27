import type { PokemonAdapted } from "@/domain/entities/pokemon";

interface PokemonCardViewProps {
  pokemon: PokemonAdapted;
  onSelect: (pokemon: PokemonAdapted) => void;
}

const PokemonCardView = ({ pokemon, onSelect }: PokemonCardViewProps) => {
  return (
    <button
      onClick={() => onSelect(pokemon)}
      className="flex cursor-pointer flex-col items-center pt-20 p-4 border group border-gray-500/10  rounded-xl shadow relative"
    >
      <h3 className="text-gray-400 text-2xl  font-bold mb-2 right-5 top-5 absolute">
        #{pokemon.id}
      </h3>
      <img
        className="w-24 h-24 object-contain transition-transform group-hover:-rotate-10 group-hover:scale-180  -top-10 scale-150 absolute "
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
      <h3 className="relative z-10 text-lg capitalize mb-3 font-black group-hover:rotate-5 transition-all group-hover:-translate-y-1 border border-gray-300 group-hover:bg-blue-300 px-3 rounded-xl">
        {pokemon.name}
      </h3>
    </button>
  );
};

export default PokemonCardView;
