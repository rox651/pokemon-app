import type { Pokemon, PokemonAdapted } from "@/domain/entities/pokemon";

export function calculateTotalStat(pokemon: Pokemon | PokemonAdapted): number {
  return pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);
}
