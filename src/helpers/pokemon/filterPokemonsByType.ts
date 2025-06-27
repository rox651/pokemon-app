import type { PokemonAdapted } from "@/domain/entities/pokemon";

export function filterPokemonsByType(
   pokemons: PokemonAdapted[] | undefined,
   filterType: string | null
): PokemonAdapted[] | undefined {
   if (!pokemons || !filterType) return pokemons;
   return pokemons.filter(pokemon => pokemon.types.some(type => type.type.name === filterType));
}
