import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";
import type { PokemonAdapted } from "@/domain/entities/pokemon";

import { type Table } from "@tanstack/react-table";

interface PokemonPaginationProps {
  table: Table<PokemonAdapted>;
  isLoading: boolean;
}

const PokemonPagination = ({ table, isLoading }: PokemonPaginationProps) => {
  return (
    <div
      className="[&>button]:cursor-pointer flex justify-center items-center gap-2 mt-4 mb-5"
      inert={isLoading}
    >
      <button
        onClick={() => table.firstPage()}
        disabled={!table.getCanPreviousPage()}
        className="p-2 bg-[#EC9AFA] text-gray-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-300"
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </button>
      <button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
        className="p-2 bg-[#EC9AFA] text-gray-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-300"
      >
        <HiArrowNarrowLeft />
      </button>
      <span className="text-white">
        Page {table.getState().pagination.pageIndex + 1} of{" "}
        {table.getPageCount()}
      </span>
      <button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
        className="p-2 bg-[#EC9AFA] text-gray-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-300"
      >
        <HiArrowNarrowRight />
      </button>
      <button
        onClick={() => table.lastPage()}
        disabled={!table.getCanNextPage()}
        className="p-2 bg-[#EC9AFA] text-gray-800 rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-300"
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default PokemonPagination;
