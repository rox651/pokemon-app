import type { PokemonAdapted } from "@/domain/entities/pokemon";

export function getBaseStat(pokemon: PokemonAdapted, statName: string): number {
   return pokemon.stats.find(stat => stat.stat.name === statName)?.base_stat ?? 0;
}
