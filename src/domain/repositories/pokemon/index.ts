import type {
  Move,
  PokemonAdapted,
  PokemonMetadata,
  PokemonMove,
} from "@/domain/entities/pokemon/";

export interface PokemonRepository {
  fetchAllPokemons(): Promise<PokemonMetadata[]>;
  fetchPokemonByName(name: string): Promise<PokemonAdapted>;
  fetchPokemonMoveByName(moveName: string): Promise<Move>;
}
