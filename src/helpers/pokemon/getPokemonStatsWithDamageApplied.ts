import type { PokemonAdapted, Stat } from "@/domain/entities/pokemon";

export const getPokemonStatsWithDamageApplied = (
   pokemon: PokemonAdapted,
   damage: number
): { stats: Stat[]; hp: number } => {
   let hp = 0;

   const stats = pokemon.stats.map(stat => {
      if (stat.stat.name === "hp") {
         const remainingHp = stat.base_stat - damage;
         hp = Math.max(0, remainingHp);

         return {
            ...stat,
            base_stat: hp,
         };
      }

      return stat;
   });

   return {
      stats,
      hp,
   };
};
