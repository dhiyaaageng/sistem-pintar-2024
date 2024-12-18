import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { UseTablePagination } from "./hooks/useTablePaginaton";
import { HiChevronDoubleLeft } from "react-icons/hi";
import { HiChevronDoubleRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

interface TablePaginationProps {
  count: number;
  tablePagination: UseTablePagination;
}

const TablePagination: React.FC<TablePaginationProps> = ({ tablePagination }) => {
  const { currentPage, handleChangePage, totalPages } = tablePagination;

  const PaginationButton = ({ page }: { page: number }) => {
    return (
      <PaginationItem onClick={() => handleChangePage(`${page}`)}>
        <PaginationLink
          className={cn(
            `cursor-pointer border-[1px] border-[#E9E9E9] font-normal`,
            currentPage === page ? "bg-primary text-white" : "bg-none",
          )}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  };

  const PaginationFirst = () => {
    return (
      <PaginationItem
        className="rounded-md border-[1px] border-[#E9E9E9]"
        onClick={() => handleChangePage("1")}
      >
        <PaginationLink className="flex w-20 cursor-pointer items-center gap-2 font-normal">
          <HiChevronDoubleLeft className="size-4" />
          <span>First</span>
        </PaginationLink>
      </PaginationItem>
    );
  };

  const PaginationLast = () => {
    return (
      <PaginationItem
        className="rounded-md border-[1px] border-[#E9E9E9]"
        onClick={() => handleChangePage(`${totalPages}`)}
      >
        <PaginationLink className="flex w-20 cursor-pointer items-center gap-2 font-normal">
          <span>Last</span>
          <HiChevronDoubleRight className="size-4" />
        </PaginationLink>
      </PaginationItem>
    );
  };

  return (
    <div className="my-4 flex w-full justify-between">
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationFirst />
            <PaginationItem>
              <PaginationPrevious
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
                className={cn(
                  currentPage <= 1 ? "pointer-events-none opacity-50" : undefined,
                  "rounded-md border-[1px] border-[#E9E9E9] font-normal",
                )}
                onClick={() => handleChangePage(`${currentPage - 1}`)}
              />
            </PaginationItem>

            {currentPage >= 3 && (
              <>
                <PaginationButton page={1} />

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {(currentPage < 3
              ? Array.from(Array(totalPages < 3 ? totalPages : 3).keys())
              : currentPage < totalPages
                ? [currentPage - 2, currentPage - 1, currentPage]
                : [currentPage - 3, currentPage - 2, currentPage - 1]
            ).map((page, index) => {
              const itemPage = page + 1;

              return <PaginationButton page={itemPage} key={index} />;
            })}

            {totalPages > 3 && currentPage < totalPages - 1 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationButton page={totalPages} />
              </>
            )}

            <PaginationItem>
              <PaginationNext
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
                className={cn(
                  currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined,
                  "rounded-md border-[1px] border-[#E9E9E9] font-normal",
                )}
                onClick={() => handleChangePage(`${currentPage + 1}`)}
              />
            </PaginationItem>
            <PaginationLast />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TablePagination;