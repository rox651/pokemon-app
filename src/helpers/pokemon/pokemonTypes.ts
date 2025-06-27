import { pokemonTypes, type PokemonType } from "@/domain/entities/pokemon/pokemonTypes";

export const getPokemonTypeColor = (type: string): string => {
   return pokemonTypes[type as PokemonType] || "#777777";
};

export const getPokemonTypeOptions = () => {
   return Object.keys(pokemonTypes).map(type => ({
      label: type.charAt(0).toUpperCase() + type.slice(1),
      value: type,
   }));
};
