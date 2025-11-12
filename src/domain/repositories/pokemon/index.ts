import type {
  Move,
  PokemonAdapted,
  PokemonMetadata,
  PokemonMove,
  PokemonTypeInfo,
} from "@/domain/entities/pokemon/";

export interface PokemonRepository {
  fetchAllPokemons(): Promise<PokemonMetadata[]>;
  fetchPokemonByName(name: string): Promise<PokemonAdapted>;
  fetchPokemonMoveByName(moveName: string): Promise<Move>;
  fetchPokemonTypes(typeName: string): Promise<PokemonTypeInfo>;
}
