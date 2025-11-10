import type { Pokemon, PokemonAdapted } from "@/domain/entities/pokemon";
import { calculateTotalStat } from "./calculateTotalStat";

export const adaptPokemonInfo = (pokemon: Pokemon): PokemonAdapted => {
   const pokemonHeightAsMeters = pokemon.height / 10;
   const pokemonWeightAsKg = pokemon.weight / 10;

   const totalStat = calculateTotalStat(pokemon);

   const pokemonMoves = pokemon.moves.slice(0, 4);

   return {
      ...pokemon,
      height: pokemonHeightAsMeters,
      weight: pokemonWeightAsKg,
      total_stat: totalStat,
      moves: pokemonMoves,
   };
};
