import { useGetAllPokemons } from "@/hooks/pokemon/useGetAllPokemons";
import PokemonGridView from "@/views/pokemon/PokemonGridView";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useGetAllPokemons();

  if (isLoading) {
    return <div>Loading</div>;
  }

  if (!data || data.length === 0) {
    return <div>No results</div>;
  }

  return <PokemonGridView pokemons={data} />;
}
