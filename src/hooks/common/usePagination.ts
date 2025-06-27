import { useState, useMemo } from "react";
import {
   useReactTable,
   getCoreRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   getFilteredRowModel,
   type SortingState,
   type ColumnDef,
} from "@tanstack/react-table";

export const usePagination = <T>(
   data: T[] | undefined,
   columns: ColumnDef<T, unknown>[],
   initialPageSize = 10,
   filterType?: string | null
) => {
   const [pagination, setPagination] = useState({
      pageIndex: 0,
      pageSize: initialPageSize,
   });
   const [sorting, setSorting] = useState<SortingState>([]);

   const filteredData = useMemo(() => {
      if (!data || !filterType) return data;

      return data.filter((item: any) => {
         if (item.types && Array.isArray(item.types)) {
            return item.types.some((type: any) => type.type.name === filterType);
         }
         return true;
      });
   }, [data, filterType]);

   const table = useReactTable({
      data: filteredData ?? [],
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state: { pagination, sorting },
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      autoResetPageIndex: false,
   });

   return table;
};
