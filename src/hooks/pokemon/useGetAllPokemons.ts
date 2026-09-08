import { useQueryClient, useQuery } from "@tanstack/react-query";
import { PokemonApiAdapter } from "@/infrastructure/adapters/pokemon";

const repository = new PokemonApiAdapter();

export const useGetAllPokemons = (offset: number, limit: number) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["pokemons", offset, limit],
    queryFn: async () => {
      const { results, totalCount } = await repository.fetchAllPokemons(offset, limit);

      const pokemons = await Promise.all(
        results.map(async (pokemon) => {
          const fullData = await repository.fetchPokemonByName(pokemon.name);

          queryClient.setQueryData(["pokemon", pokemon.name], fullData);

          return fullData;
        }),
      );

      return { pokemons, totalCount };
    },
  });
};
