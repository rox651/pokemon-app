import { useMemo } from "react";

type PaginationProps = {
  totalCount: number;
  pageSize: number;
  currentPage: number;
};

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
}: PaginationProps) => {
  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / pageSize);
  }, [totalCount, pageSize]);

  return {
    totalPages,
    currentPage,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages,
  };
};
