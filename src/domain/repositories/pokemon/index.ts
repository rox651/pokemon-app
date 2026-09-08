import type {
  Move,
  PokemonAdapted,
  PokemonMetadata,
  PokemonTypeInfo,
} from "@/domain/entities/pokemon/";

export interface PokemonRepository {
  fetchAllPokemons(offset: number, limit: number): Promise<{
    results: PokemonMetadata[]
    totalCount: number,
  }>;
  fetchPokemonByName(name: string): Promise<PokemonAdapted>;
  fetchPokemonById(id: number): Promise<PokemonAdapted>;
  fetchPokemonMoveByName(moveName: string): Promise<Move>;
  fetchPokemonTypes(typeName: string): Promise<PokemonTypeInfo>;
}
