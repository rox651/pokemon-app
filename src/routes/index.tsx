import { useState } from "react";

import { useGetAllPokemons } from "@/hooks/pokemon/useGetAllPokemons";
import { useLocalStorage } from "@/hooks/common/useLocalStorage";
import { createFileRoute } from "@tanstack/react-router";

import PokemonGridView from "@/views/pokemon/PokemonGridView";
import PokemonTableView from "@/views/pokemon/PokemonTableView";
import PokemonModalView from "@/views/pokemon/PokemonModalView";
import PokemonGridSkeleton from "@/views/pokemon/PokemonGridSkeleton";
import PokemonTableSkeleton from "@/views/pokemon/PokemonTableSkeleton";

import type { Pokemon } from "@/domain/entities/pokemon";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [currentView, setCurrentView] = useLocalStorage<"grid" | "table">({
    key: "currentView",
    defaultValue: "grid",
  });

  const { data: pokemons, isLoading: isLoadingPokemons } = useGetAllPokemons();

  if (pokemons?.length === 0) {
    return <div>No results</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Pokemon List</h1>
      <h2 className="text-lg font-medium mt-10">
        Current view: <span className="capitalize">{currentView}</span>
      </h2>
      <button
        onClick={() =>
          setCurrentView((prev) => (prev === "grid" ? "table" : "grid"))
        }
        className=" px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Change view
      </button>
      {isLoadingPokemons && currentView === "grid" && <PokemonGridSkeleton />}
      {isLoadingPokemons && currentView === "table" && <PokemonTableSkeleton />}
      {pokemons && (
        <>
          {currentView === "grid" ? (
            <PokemonGridView
              pokemons={pokemons}
              onSelect={setSelectedPokemon}
            />
          ) : (
            <PokemonTableView
              pokemons={pokemons}
              onSelect={setSelectedPokemon}
            />
          )}
        </>
      )}
      {selectedPokemon && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
            <button
              onClick={() => setSelectedPokemon(null)}
              className="absolute cursor-pointer top-2 right-2 text-gray-500 hover:text-black"
            >
              X{" "}
            </button>
            <PokemonModalView pokemon={selectedPokemon} />
          </div>
        </div>
      )}
    </div>
  );
}
