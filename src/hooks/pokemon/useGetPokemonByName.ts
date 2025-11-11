import { useQuery } from "@tanstack/react-query";
import { PokemonApiAdapter } from "@/infrastructure/adapters/pokemon";

const repository = new PokemonApiAdapter();

interface UseGetPokemonByNameProps {
  name?: string;
  enabled?: boolean;
}

export const useGetPokemonByName = ({
  name,
  enabled,
}: UseGetPokemonByNameProps) => {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      if (!name) {
        return;
      }
      const pokemon = await repository.fetchPokemonByName(name);
      return pokemon;
    },
    enabled,
  });
};
