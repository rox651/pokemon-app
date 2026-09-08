import { useQueryClient, useQuery } from "@tanstack/react-query";
import { PokemonApiAdapter } from "@/infrastructure/adapters/pokemon";

const repository = new PokemonApiAdapter();

export const useGetAllPokemons = (offset: number, limit: number, filterType: string | null) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["pokemons", offset, limit, filterType],
    queryFn: async () => {
      console.log([offset, limit, filterType])
      const { results, totalCount } = await repository.fetchAllPokemons(offset, limit, filterType);

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
