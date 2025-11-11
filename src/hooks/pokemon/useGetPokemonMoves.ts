import { useQuery } from "@tanstack/react-query";
import { PokemonApiAdapter } from "@/infrastructure/adapters/pokemon";

const repository = new PokemonApiAdapter();

export const useGetPokemonsMoves = (
  pokemonName: string,
  movesNames: string[],
) => {
  return useQuery({
    queryKey: ["moves", pokemonName],
    queryFn: async () => {
      const moves = await Promise.all(
        movesNames.map(async (moveName) => {
          const fullData = await repository.fetchPokemonMoveByName(moveName);
          return fullData;
        }),
      );
      return moves;
    },
  });
};
