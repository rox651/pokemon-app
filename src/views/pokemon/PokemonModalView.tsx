import type { Pokemon } from "@/domain/entities/pokemon";
import { cn } from "@/helpers/common/cn";

interface PokemonModalViewProps {
  pokemon: Pokemon;
}

const PokemonModalView = ({ pokemon }: PokemonModalViewProps) => {
  const statsMap: Record<string, string> = {
    hp: "HP",
    attack: "ATK",
    defense: "DEF",
    "special-attack": "SpA",
    "special-defense": "SpD",
    speed: "SPD",
  };

  const totalStat = pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl p-6 shadow-xl space-y-4 text-center">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto w-40 h-40 object-contain"
      />
      <p className="text-gray-400 font-semibold text-sm">#{pokemon.id}</p>
      <h2 className="text-2xl font-bold capitalize">{pokemon.name}</h2>
      <div className="flex justify-center gap-2">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={cn("px-3 py-1 text-xs font-semibold rounded-full", {
              "bg-blue-500": t.type.name === "water",
              "bg-gray-500": t.type.name === "steel",
              "bg-red-500": t.type.name === "fire",
              "bg-green-500": t.type.name === "grass",
              "bg-yellow-500": t.type.name === "electric",
            })}
          >
            {t.type.name.toUpperCase()}
          </span>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        {pokemon.abilities.map((a) => (
          <div
            key={a.ability?.name}
            className={cn(
              "px-3 py-1 border rounded-full text-sm font-medium",
              a.is_hidden
                ? "border-red-300 text-red-500"
                : "border-blue-300 text-blue-600",
            )}
          >
            {a.ability?.name}
          </div>
        ))}
      </div>

      <div className="flex justify-around mt-4 text-sm font-medium text-gray-700">
        <div>
          <div className="text-xs text-gray-500">Height</div>
          <div>{pokemon.height / 10} m</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Weight</div>
          <div>{pokemon.weight / 10} kg</div>
        </div>
        <div>
          <div className="text-xs text-gray-500">Base EXP</div>
          <div>{pokemon.base_experience}</div>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-semibold text-gray-700">Stats</h3>
        <div className="grid grid-cols-3 gap-2 text-xs">
          {pokemon.stats.map((s) => (
            <div
              key={s.stat.name}
              className="flex justify-between bg-gray-100 px-2 py-1 rounded-md"
            >
              <span>{statsMap[s.stat.name]}</span>
              <span className="font-bold">{s.base_stat}</span>
            </div>
          ))}
          <div className="flex justify-between bg-gray-200 px-2 py-1 rounded-md font-bold col-span-3">
            <span>TOT</span>
            <span>{totalStat}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonModalView;
