import { useState, useMemo } from "react";

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
import PokemonBattleModal from "@/components/pokemon/PokemonBattleModal";

import { pokemonColumns } from "@/helpers/pokemon/pokemonColumns";
import { PAGE_SIZE } from "@/domain/entities/constant";

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

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: PAGE_SIZE,
  });

  const [currentView, setCurrentView] = useLocalStorage<"grid" | "table">({
    key: "currentView",
    defaultValue: "grid",
  });

  const [filterType, setFilterType] = useState<string | null>(null);

  const onSelect = (pokemon: PokemonAdapted) => {
    setSelectedPokemon(pokemon);
  };

  const columns = pokemonColumns(onSelect);
  const { data, isLoading: isLoadingPokemons } = useGetAllPokemons(
    pagination.pageIndex * pagination.pageSize,
    pagination.pageSize,
    filterType,
  );

  const table = usePagination(
    data?.pokemons,
    columns,
    pagination,
    setPagination,
    filterType,
    data?.totalCount,
  );

  const handleFilterChange = (selectedType: string | null) => {
    setFilterType(selectedType);
  };

  return (
    <div className="">
      <h1 className="text-[80px] text-center lg:text-left lg:text-[110px] text-white  my-10  leading-20 lg:leading-30 lg:w-1/2 break-words ">
        Pokédex simulator
      </h1>
      <aside className="flex gap-3 justify-center flex-col lg:flex-row lg:justify-between">
        <PokemonControls
          table={table}
          currentView={currentView}
          onViewChange={setCurrentView}
          onFilterChange={handleFilterChange}
          isLoading={isLoadingPokemons}
        />
        <PokemonPagination table={table} isLoading={isLoadingPokemons} />
      </aside>
      {isLoadingPokemons && currentView === "grid" && <PokemonGridSkeleton />}
      {isLoadingPokemons && currentView === "table" && <PokemonTableSkeleton />}
      {data?.pokemons && data.pokemons.length > 0 && !isLoadingPokemons && (
        <>
          {currentView === "grid" ? (
            <PokemonGridView
              pokemons={table.getRowModel().rows}
              onSelect={setSelectedPokemon}
            />
          ) : (
            <PokemonTableView table={table} />
          )}
        </>
      )}
      <PokemonPagination table={table} isLoading={isLoadingPokemons} />

      {selectedPokemon && (
        <PokemonModalView
          pokemon={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
      )}

      {status !== "idle" && <PokemonBattleModal />}
    </div>
  );
}
