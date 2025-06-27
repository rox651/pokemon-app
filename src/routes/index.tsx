import { useState } from "react";

import { useGetAllPokemons } from "@/hooks/pokemon/useGetAllPokemons";
import { useLocalStorage } from "@/hooks/common/useLocalStorage";
import { usePagination } from "@/hooks/common/usePagination";
import { createFileRoute } from "@tanstack/react-router";

import PokemonGridView from "@/views/pokemon/PokemonGridView";
import PokemonTableView from "@/views/pokemon/PokemonTableView";
import PokemonModalView from "@/views/pokemon/PokemonModalView";

import PokemonGridSkeleton from "@/components/pokemon/PokemonGridSkeleton";
import PokemonTableSkeleton from "@/components/pokemon/PokemonTableSkeleton";
import PokemonPagination from "@/components/pokemon/PokemonPagination";
import PokemonControls from "@/components/pokemon/PokemonControls";

import { pokemonColumns } from "@/helpers/pokemon/pokemonColumns";

import type { PokemonAdapted } from "@/domain/entities/pokemon";

export const Route = createFileRoute("/")({
   component: RouteComponent,
});

function RouteComponent() {
   const [selectedPokemon, setSelectedPokemon] = useState<PokemonAdapted | null>(null);
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
   const table = usePagination(pokemons, columns, 10, filterType);

   const handleFilterChange = (selectedType: string | null) => {
      setFilterType(selectedType);
   };

   return (
      <div>
         <h1 className="text-3xl lg:text-5xl font-black text-center mt-10">Pokemon List</h1>
         {!isLoadingPokemons && (
            <PokemonControls
               currentView={currentView}
               onViewChange={setCurrentView}
               onFilterChange={handleFilterChange}
            />
         )}

         {isLoadingPokemons && currentView === "grid" && <PokemonGridSkeleton />}
         {isLoadingPokemons && currentView === "table" && <PokemonTableSkeleton />}
         {pokemons && pokemons.length > 0 && (
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
            <PokemonModalView pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
         )}
      </div>
   );
}
