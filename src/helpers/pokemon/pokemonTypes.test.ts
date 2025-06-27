import { getPokemonTypeColor, getPokemonTypeOptions } from "./pokemonTypes";

describe("getPokemonTypeColor", () => {
   it("returns the correct color for a known type", () => {
      expect(getPokemonTypeColor("fire")).toBe("#EE8130");
      expect(getPokemonTypeColor("water")).toBe("#6390F0");
      expect(getPokemonTypeColor("electric")).toBe("#F7D02C");
   });

   it("returns fallback color for unknown type", () => {
      expect(getPokemonTypeColor("unknown")).toBe("#777777");
   });
});

describe("getPokemonTypeOptions", () => {
   it("returns all type options with correct label and value", () => {
      const options = getPokemonTypeOptions();
      expect(options).toEqual(
         expect.arrayContaining([
            { label: "Fire", value: "fire" },
            { label: "Water", value: "water" },
            { label: "Electric", value: "electric" },
         ])
      );

      expect(options.length).toBe(18);
   });
});
