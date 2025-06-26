import type { Pokemon, PokemonMetadata } from "@/domain/entities/pokemon/";

export interface PokemonRepository {
  fetchAllPokemons(): Promise<PokemonMetadata[]>;
  fetchPokemonByName(name: string): Promise<Pokemon>;
}
