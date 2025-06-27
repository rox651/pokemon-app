import type { Pokemon, PokemonAdapted } from "@/domain/entities/pokemon";

export const adaptPokemonInfo = (pokemon: Pokemon): PokemonAdapted => {
  const pokemonHeightAsMeters = pokemon.height / 10;
  const pokemonWeightAsKg = pokemon.weight / 10;

  const totalStat = pokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);

  return {
    ...pokemon,
    height: pokemonHeightAsMeters,
    weight: pokemonWeightAsKg,
    total_stat: totalStat,
  };
};
