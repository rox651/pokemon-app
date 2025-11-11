import type { PokemonRepository } from "@/domain/repositories/pokemon";
import type {
   Pokemon,
   PokemonMetadata,
   PokemonAdapted,
   Move,
   PokemonTypeInfo,
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
      const move: Move = {
         ...response.data,
         type: response.data.type.name,
      };
      return move;
   }

   async fetchPokemonTypes(typeName: string): Promise<PokemonTypeInfo> {
      const response = await axiosClient.get(`/type/${typeName}`);
      const typeInfo: PokemonTypeInfo = {
         id: response.data.id,
         name: response.data.name,
         damage_relations: response.data.damage_relations,
      };
      return typeInfo;
   }
}
