import { filterPokemonsByType } from "./filterPokemonsByType";
import { adaptPokemonInfo } from "./adaptPokemonInfo";
import { mockPokemon } from "@/test/pokemon/mockData";

describe("filterPokemonsByType", () => {
   const adapted = adaptPokemonInfo(mockPokemon);

   it("returns all pokemons if filterType is null", () => {
      const result = filterPokemonsByType([adapted], null);
      expect(result).toEqual([adapted]);
   });

   it("returns only pokemons matching the filterType", () => {
      const result = filterPokemonsByType([adapted], "electric");
      expect(result).toEqual([adapted]);
   });

   it("returns empty array if no pokemons match the filterType", () => {
      const result = filterPokemonsByType([adapted], "fire");
      expect(result).toEqual([]);
   });

   it("returns undefined if input is undefined", () => {
      const result = filterPokemonsByType(undefined, "electric");
      expect(result).toBeUndefined();
   });
});
