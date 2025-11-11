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
    <div className="mt-4 space-y-1">
      <h3 className="text-sm font-semibold text-gray-700">Stats</h3>
      <div className="grid grid-cols-3 gap-2 text-xs">
        {pokemon.stats.map((stat) => (
          <PokemonStat
            key={stat.stat.name}
            name={statsMap[stat.stat.name as PokemonStatType]}
            value={stat.base_stat}
          />
        ))}
        <div className="flex justify-between bg-gray-200 px-2 py-1 rounded-md font-bold col-span-3">
          <span>TOT</span>
          <span>{pokemon.total_stat}</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonStats;
