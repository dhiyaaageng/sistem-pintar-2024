import { useState } from "react";

export interface UseTablePagination {
  currentPage: number;
  handleChangePage: (selectedPage: string) => void;
  handleChangePaginationLimit: (selectedPaginationLimit: string) => void;
  handleCountChange: (count: number) => void;
  pagination: {
    limit: number;
    offset: number;
  };
  totalPages: number;
}

interface useTablePaginationProps {
  count: number;
}

const getTotalPages = (count: number, limit: number) => {
  return Math.ceil(count / limit);
};

const useTablePagination: (props?: useTablePaginationProps) => UseTablePagination = () => {
  const [count, setCount] = useState(0);
  const [pagination, setPagination] = useState({
    limit: 10,
    offset: 0,
  });

  const currentPage = pagination.offset / pagination.limit + 1;

  const handleChangePaginationLimit = (selectedPaginationLimit: string) => {
    setPagination((prevState) => ({
      ...prevState,
      limit: parseInt(selectedPaginationLimit),
    }));

  };

  const handleChangePage = (selectedPage: string) => {
    setPagination((prevState) => ({
      ...prevState,
      offset: (parseInt(selectedPage) - 1) * prevState.limit,
    }));
  };

  const handleCountChange = (count: number) => {
    setCount(count);
  };

  return {
    currentPage,
    handleChangePage,
    handleChangePaginationLimit,
    pagination,
    handleCountChange,
    totalPages: getTotalPages(count, pagination.limit),
  };
};

export default useTablePagination;