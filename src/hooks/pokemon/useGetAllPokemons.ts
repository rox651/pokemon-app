import { useQueryClient, useQuery } from "@tanstack/react-query";

import { PokemonApiAdapter } from "@/infrastructure/adapters/pokemon";

const repository = new PokemonApiAdapter();

export const useGetAllPokemons = () => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["pokemons"],
    queryFn: async () => {
      const pokemonsMetadata = await repository.fetchAllPokemons();

      const pokemons = await Promise.all(
        pokemonsMetadata.map((pokemon) =>
          queryClient.prefetchQuery({
            queryKey: ["pokemon", pokemon.name],
            queryFn: async () => {
              return await repository.fetchPokemonByName(pokemon.name);
            },
          }),
        ),
      );

      return pokemons;
    },
  });
};
