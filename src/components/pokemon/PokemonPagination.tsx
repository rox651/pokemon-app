import {
   MdOutlineKeyboardArrowLeft,
   MdOutlineKeyboardArrowRight,
   MdOutlineKeyboardDoubleArrowLeft,
   MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import type { PokemonAdapted } from "@/domain/entities/pokemon";

import { type Table } from "@tanstack/react-table";

interface PokemonPaginationProps {
   table: Table<PokemonAdapted>;
}

const PokemonPagination = ({ table }: PokemonPaginationProps) => {
   return (
      <div className="[&>button]:cursor-pointer flex justify-center items-center gap-2 mt-4 mb-20">
         <button
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-300"
         >
            <MdOutlineKeyboardDoubleArrowLeft />
         </button>
         <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-300"
         >
            <MdOutlineKeyboardArrowLeft />
         </button>
         <span>
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
         </span>
         <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-300"
         >
            <MdOutlineKeyboardArrowRight />
         </button>
         <button
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-400 transition duration-300"
         >
            <MdOutlineKeyboardDoubleArrowRight />
         </button>
         <select
            value={table.getState().pagination.pageSize}
            onChange={e => {
               table.setPageSize(Number(e.target.value));
            }}
            className="px-3 py-2 bg-white border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
         >
            {[10, 20, 30, 40, 50].map(pageSize => (
               <option key={pageSize} value={pageSize}>
                  {pageSize}
               </option>
            ))}
         </select>
      </div>
   );
};

export default PokemonPagination;
