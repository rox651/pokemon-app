import { useState, useMemo, useEffect } from "react";
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

   const table = useReactTable({
      data: data ?? [],
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

   const tableState = table.getState();
   const pageSize = useMemo(() => {
      return tableState.pagination.pageSize;
   }, [tableState]);

   useEffect(() => {
      if (filterType && pageSize) {
         setPagination({
            pageIndex: 0,
            pageSize: initialPageSize,
         });
      }
   }, [filterType, table]);

   return table;
};
