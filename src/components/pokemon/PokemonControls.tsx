import type { PokemonAdapted } from "@/domain/entities/pokemon";
import type { Table } from "@tanstack/react-table";

import { AiOutlineEye } from "react-icons/ai";

import PokemonButtonViewChange from "./PokemonButtonViewChange";
import PokemonSelectFilter from "./PokemonSelectFilter";
import { PAGE_SIZE } from "@/domain/entities/constant";

interface PokemonControlsProps {
  table: Table<PokemonAdapted>;
  currentView: "grid" | "table";
  onViewChange: (view: "grid" | "table") => void;
  onFilterChange: (selectedType: string | null) => void;
  isLoading: boolean;
}

const optionsPageSize = Array.from(
  { length: PAGE_SIZE },
  (_, i) => (i + 1) * PAGE_SIZE,
);

export default function PokemonControls({
  table,
  currentView,
  onViewChange,
  onFilterChange,
  isLoading,
}: PokemonControlsProps) {
  return (
    <div
      className="flex gap-10 items-center justify-center flex-wrap"
      inert={isLoading}
    >
      <PokemonSelectFilter onFilterChange={onFilterChange} />
      <div className="flex items-center gap-x-2">
        <PokemonButtonViewChange
          currentView={currentView}
          onViewChange={onViewChange}
        />

        <div className="flex items-center gap-x-2">
          <AiOutlineEye className="text-[#F4FF69]" />
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="text-white cursor-pointer"
          >
            {optionsPageSize.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
