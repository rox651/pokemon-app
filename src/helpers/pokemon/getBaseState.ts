import type { Pokemon } from "@/domain/entities/pokemon";

export function getBaseStat(pokemon: Pokemon, statName: string): number {
  return (
    pokemon.stats.find((stat) => stat.stat.name === statName)?.base_stat ?? 0
  );
}
