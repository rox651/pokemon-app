import type {
  PokemonAdapted,
  PokemonStatType,
} from "@/domain/entities/pokemon";
import PokemonStat from "@/components/pokemon/PokemonStat";

interface PokemonStatsProps {
  pokemon: PokemonAdapted;
}

const statsMap: Record<PokemonStatType, string> = {
  hp: "HP",
  attack: "ATK",
  defense: "DEF",
  "special-attack": "SpA",
  "special-defense": "SpD",
  speed: "SPD",
};

const PokemonStats = ({ pokemon }: PokemonStatsProps) => {
  return (
    <div className="mt-4 space-y-2">
      <h3 className="text-sm sm:text-base font-semibold text-gray-700 mb-2">Stats</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
        {pokemon.stats.map((stat) => (
          <PokemonStat
            key={stat.stat.name}
            name={statsMap[stat.stat.name as PokemonStatType]}
            value={stat.base_stat}
          />
        ))}
        <div className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded-md font-bold col-span-2 sm:col-span-3 text-xs sm:text-sm">
          <span>TOT</span>
          <span>{pokemon.total_stat}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonStats;
