import type { Pokemon } from "@/domain/entities/pokemon";
import { useState } from "react";
import { pokemonColumns } from "@/helpers/pokemon/pokemonColumns";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table";

interface PokemonTableViewProps {
  pokemons: Pokemon[];
  onSelect: (pokemon: Pokemon) => void;
}

const PokemonTableView = ({ pokemons, onSelect }: PokemonTableViewProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: pokemons,
    columns: pokemonColumns(onSelect),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    autoResetPageIndex: false,
  });

  return (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="border-b border-gray-300">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={`py-2 px-4 text-left ${
                  header.column.getCanSort()
                    ? "cursor-pointer hover:text-blue-500"
                    : ""
                }`}
                {...(header.column.getCanSort()
                  ? { onClick: header.column.getToggleSortingHandler() }
                  : {})}
              >
                <div className="flex items-center space-x-2">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                  {header.column.getIsSorted() === "asc" ? (
                    <span>&uarr;</span>
                  ) : header.column.getIsSorted() === "desc" ? (
                    <span>&darr;</span>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-2 px-4 border-t border-gray-300">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PokemonTableView;
