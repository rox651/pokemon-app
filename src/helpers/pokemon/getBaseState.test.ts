import { getBaseStat } from "./getBaseState";
import { adaptPokemonInfo } from "./adaptPokemonInfo";
import { mockPokemon } from "@/test/pokemon/mockData";

describe("getBaseStat", () => {
  const adapted = adaptPokemonInfo(mockPokemon);

  it("returns the correct stat value if present", () => {
    expect(getBaseStat(adapted, "speed")).toBe(35);
  });

  it("returns 0 if the stat is not present", () => {
    expect(getBaseStat(adapted, "attack")).toBe(0);
  });
});
