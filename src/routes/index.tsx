import { useState } from "react";

import { useGetAllPokemons } from "@/hooks/pokemon/useGetAllPokemons";
import { useLocalStorage } from "@/hooks/common/useLocalStorage";
import { usePagination } from "@/hooks/common/usePagination";
import useStore from "@/store";
import { createFileRoute } from "@tanstack/react-router";

import PokemonGridView from "@/views/pokemon/PokemonGridView";
import PokemonTableView from "@/views/pokemon/PokemonTableView";
import PokemonModalView from "@/views/pokemon/PokemonModalView";

import PokemonGridSkeleton from "@/components/pokemon/PokemonGridSkeleton";
import PokemonTableSkeleton from "@/components/pokemon/PokemonTableSkeleton";
import PokemonPagination from "@/components/pokemon/PokemonPagination";
import PokemonControls from "@/components/pokemon/PokemonControls";
import PokemonControlsSkeleton from "@/components/pokemon/PokemonControlsSkeleton";
import PokemonPaginationSkeleton from "@/components/pokemon/PokemonPaginationSkeleton";
import PokemonBattleModal from "@/components/pokemon/PokemonBattleModal";

import { pokemonColumns } from "@/helpers/pokemon/pokemonColumns";
import { filterPokemonsByType } from "@/helpers/pokemon/filterPokemonsByType";

import type { PokemonAdapted } from "@/domain/entities/pokemon";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const status = useStore((state) => state.status);
  const selectedPokemon = useStore((state) => state.selectedPokemonForModal);
  const setSelectedPokemon = useStore(
    (state) => state.setSelectedPokemonForModal,
  );

  const [currentView, setCurrentView] = useLocalStorage<"grid" | "table">({
    key: "currentView",
    defaultValue: "grid",
  });

  const [filterType, setFilterType] = useState<string | null>(null);

  const onSelect = (pokemon: PokemonAdapted) => {
    setSelectedPokemon(pokemon);
  };

  const columns = pokemonColumns(onSelect);
  const { data: pokemons, isLoading: isLoadingPokemons } = useGetAllPokemons();
  const filteredPokemons = filterPokemonsByType(pokemons, filterType);
  const table = usePagination(filteredPokemons, columns, 10, filterType);

  const handleFilterChange = (selectedType: string | null) => {
    setFilterType(selectedType);
  };

  return (
    <div>
      <h1 className="text-3xl lg:text-5xl font-black text-center mt-10">
        Pokemon List
      </h1>
      {isLoadingPokemons && <PokemonControlsSkeleton />}
      {isLoadingPokemons && <PokemonPaginationSkeleton />}
      {isLoadingPokemons && currentView === "grid" && <PokemonGridSkeleton />}
      {isLoadingPokemons && currentView === "table" && <PokemonTableSkeleton />}
      {!isLoadingPokemons && (
        <PokemonControls
          currentView={currentView}
          onViewChange={setCurrentView}
          onFilterChange={handleFilterChange}
        />
      )}
      {filteredPokemons && filteredPokemons.length > 0 && (
        <>
          <PokemonPagination table={table} />
          {currentView === "grid" ? (
            <PokemonGridView
              pokemons={table.getRowModel().rows}
              onSelect={setSelectedPokemon}
            />
          ) : (
            <PokemonTableView table={table} />
          )}
          <PokemonPagination table={table} />
        </>
      )}

      {selectedPokemon && (
        <PokemonModalView
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      {status === "playing" && <PokemonBattleModal />}
    </div>
  );
}
