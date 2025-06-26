import { describe, expect, test } from "@jest/globals";
import { Pokemon } from "./";
import { mockPokemon } from "@/test/pokemon/pokemon/mockData";

describe("Pokemon Entity", () => {
  test("should have name and url", () => {
    const pikachu: Pokemon = mockPokemon;

    expect(pikachu.name).toBe("pikachu");
    expect(pikachu.id).toBe(25);
    expect(pikachu.base_experience).toBe(112);
    expect(pikachu.height).toBe(4);
    expect(pikachu.weight).toBe(60);
    expect(pikachu.types[0].type.name).toBe("electric");
    expect(pikachu.order).toBe(1);
    expect(pikachu.species.name).toBe("pikachu");
    expect(pikachu.sprites.front_default).toBe(
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
    );
    expect(pikachu.stats[0].base_stat).toBe(35);
    expect(pikachu.stats[0].stat.name).toBe("speed");
  });
});
