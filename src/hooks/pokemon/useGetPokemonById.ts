
import { useQuery } from "@tanstack/react-query";
import { PokemonApiAdapter } from "@/infrastructure/adapters/pokemon";

const repository = new PokemonApiAdapter();

interface UseGetPokemonByIdProps {
  id?: number;
  enabled?: boolean;
}

export const useGetPokemonById = ({
  id,
  enabled,
}: UseGetPokemonByIdProps) => {
  return useQuery({
    queryKey: ["pokemonById", id],
    queryFn: async () => {
      if (!id) {
        return;
      }
      const pokemon = await repository.fetchPokemonById(id);
      return pokemon;
    },
    enabled,
  });
};
