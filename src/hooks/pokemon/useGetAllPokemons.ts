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
        pokemonsMetadata.map(async (pokemon) => {
          const fullData = await repository.fetchPokemonByName(pokemon.name);

          queryClient.setQueryData(["pokemon", pokemon.name], fullData);

          return fullData;
        }),
      );

      return pokemons;
    },
  });
};
