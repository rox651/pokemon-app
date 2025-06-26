import { useQuery } from "@tanstack/react-query";

import { PokemonApiAdapter } from "@/infrastructure/adapters/pokemon";

const repository = new PokemonApiAdapter();

interface UseGetPokemonByNameProps {
  name: string;
}

export const useGetPokemonByName = ({ name }: UseGetPokemonByNameProps) => {
  return useQuery({
    queryKey: ["pokemon", name],
    queryFn: async () => {
      return await repository.fetchPokemonByName(name);
    },
  });
};
