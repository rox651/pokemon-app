import { calculateTotalStat } from "./calculateTotalStat";
import { mockPokemon } from "@/test/pokemon/mockData";

describe("calculateTotalStat", () => {
   it("returns the sum of all base stats", () => {
      expect(calculateTotalStat(mockPokemon)).toBe(
         mockPokemon.stats.reduce((acc, s) => acc + s.base_stat, 0)
      );
   });

   it("returns 0 if stats array is empty", () => {
      const emptyStats = { ...mockPokemon, stats: [] };
      expect(calculateTotalStat(emptyStats)).toBe(0);
   });
});
