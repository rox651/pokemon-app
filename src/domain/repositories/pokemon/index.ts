import type {
  PokemonAdapted,
  PokemonMetadata,
} from "@/domain/entities/pokemon/";

export interface PokemonRepository {
  fetchAllPokemons(): Promise<PokemonMetadata[]>;
  fetchPokemonByName(name: string): Promise<PokemonAdapted>;
}
