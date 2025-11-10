import type { PokemonRepository } from "@/domain/repositories/pokemon";
import type {
  Pokemon,
  PokemonMetadata,
  PokemonAdapted,
  Move,
} from "@/domain/entities/pokemon";
import { adaptPokemonInfo } from "@/helpers/pokemon/adaptPokemonInfo";
import { axiosClient } from "../../http/axiosClient";

export class PokemonApiAdapter implements PokemonRepository {
  async fetchAllPokemons(): Promise<PokemonMetadata[]> {
    const response = await axiosClient.get("/pokemon?limit=151");
    const results: PokemonMetadata[] = response.data.results;

    return results;
  }

  async fetchPokemonByName(name: string): Promise<PokemonAdapted> {
    const response = await axiosClient.get(`/pokemon/${name}`);
    const pokemon: Pokemon = response.data;

    return adaptPokemonInfo(pokemon);
  }

  async fetchPokemonMoveByName(name: string): Promise<Move> {
    const response = await axiosClient.get(`/move/${name}`);
    const moves: Move = response.data;
    return moves;
  }
}
