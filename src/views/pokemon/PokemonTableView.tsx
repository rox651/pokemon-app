import type { PokemonAdapted } from "@/domain/entities/pokemon";

import { flexRender, type Table } from "@tanstack/react-table";

interface PokemonTableViewProps {
  table: Table<PokemonAdapted>;
}

const PokemonTableView = ({ table }: PokemonTableViewProps) => {
  if (table.getRowModel().rows.length === 0) {
    return (
      <div className="text-center text-3xl font-bold my-10">
        No pokemons found
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto mt-10">
      <table className="min-w-[600px] w-full table-auto border-collapse border border-gray-300 text-sm sm:text-base">
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
                <td
                  key={cell.id}
                  className="py-2 px-4 border-t border-gray-300"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PokemonTableView;
