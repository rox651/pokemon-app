import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type ColumnDef,
  type PaginationState,
  OnChangeFn,
} from "@tanstack/react-table";

export const usePagination = <T>(
  data: T[] | undefined,
  columns: ColumnDef<T, unknown>[],
  pagination: PaginationState,
  setPagination: OnChangeFn<PaginationState>,
  filterType?: string | null,
  totalCount?: number,
) => {
  const [sorting, setSorting] = useState<SortingState>([]);


  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { pagination, sorting },

    manualPagination: true,
    rowCount: totalCount ?? 0,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    autoResetPageIndex: false,
  });


  const tableState = table.getState();
  const pageSize = tableState.pagination.pageSize;

  useEffect(() => {
    if (filterType || pageSize) {
      setPagination({
        pageIndex: 0,
        pageSize,
      });
    }
  }, [filterType, pageSize]);

  return table
};
