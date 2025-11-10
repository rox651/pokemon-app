import { adaptPokemonInfo } from "./adaptPokemonInfo";
import { calculateTotalStat } from "./calculateTotalStat";
import { mockPokemon } from "@/test/pokemon/mockData";

describe("adaptPokemonInfo", () => {
  it("adapts height and weight to meters and kg, and calculates total_stat", () => {
    const adapted = adaptPokemonInfo(mockPokemon);
    expect(adapted.height).toBe(mockPokemon.height / 10);
    expect(adapted.weight).toBe(mockPokemon.weight / 10);
    expect(adapted.total_stat).toBe(calculateTotalStat(mockPokemon));
    expect(adapted.name).toBe(mockPokemon.name);
    expect(adapted.id).toBe(mockPokemon.id);
  });
});
