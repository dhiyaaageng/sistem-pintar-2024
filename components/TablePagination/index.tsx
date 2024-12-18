"use client"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UseTablePagination } from "./hooks/useTablePaginaton";

interface TablePaginationProps {
  count: number;
  tablePagination: UseTablePagination;
  children?: React.ReactNode;
  totalPage?: number;
}

const limitOptions = [10, 50, 100, 500, 1000];

const TablePagination: React.FC<TablePaginationProps> = ({
  tablePagination,
  children,
  totalPage,
}) => {
  const { currentPage, handleChangePage, totalPages, handleChangePaginationLimit, pagination } =
    tablePagination;

  const PaginationButton = ({ page }: { page: number }) => {
    return (
      <PaginationItem onClick={() => handleChangePage(`${page}`)}>
        <PaginationLink
          className={`h-[36px] w-[31px] cursor-pointer !text-12 2xl:!text-14 ${
            currentPage === page
              ? "bg-primary text-white"
              : "border border-secondary/50 bg-none text-black"
          }`}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    );
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="col-span-1 flex items-center px-2 text-14">
        <span className="text-12 2xl:text-14">Result per page</span>

        <Select onValueChange={(value) => handleChangePaginationLimit(value)}>
          <SelectTrigger className="m-4 max-w-[90px] rounded-md border border-secondary/50 text-12">
            <SelectValue placeholder={pagination.limit} />
          </SelectTrigger>
          <SelectContent className="rounded-none border">
            {limitOptions.map((limitOption, index) => (
              <SelectItem value={`${limitOption}`} key={index} className="text-12 2xl:text-14">
                {limitOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1">{children}</div>

      <div className="col-span-1 flex justify-between">
        <Pagination className="justify-start">
          <PaginationContent>
            <PaginationItem>
              <PaginationLink
                className={`h-[36px] w-auto cursor-pointer border border-secondary/50 bg-none px-2 text-12 text-black 2xl:text-14`}
                onClick={() => handleChangePage("1")}
              >
                <p className="text-12 2xl:text-14">{`<< First`}</p>
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationPrevious
                aria-disabled={currentPage <= 1}
                tabIndex={currentPage <= 1 ? -1 : undefined}
                className={`h-[36px] w-auto cursor-pointer border border-secondary/50 bg-none px-2 !text-12 text-black 2xl:!text-14 ${
                  currentPage <= 1 ? "pointer-events-none opacity-50" : undefined
                } `}
                onClick={() => handleChangePage(`${currentPage - 1}`)}
              />
            </PaginationItem>

            {currentPage >= 4 && (
              <>
                <PaginationButton page={1} />

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {(currentPage < 4
              ? Array.from(Array(totalPages < 4 ? totalPages : 4).keys())
              : currentPage < totalPages
                ? [currentPage - 2, currentPage - 1, currentPage]
                : [currentPage - 3, currentPage - 2, currentPage - 1]
            ).map((page, index) => {
              const itemPage = page + 1;

              return <PaginationButton page={itemPage} key={index} />;
            })}

            {totalPages > 4 && currentPage < totalPages - 1 && (
              <>
                <PaginationItem className="flex h-[36px] w-[31px] items-center rounded-md border border-secondary/50">
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationButton page={totalPages} />
              </>
            )}

            <PaginationItem>
              <PaginationNext
                aria-disabled={currentPage >= totalPages}
                tabIndex={currentPage >= totalPages ? -1 : undefined}
                className={`h-[36px] w-auto cursor-pointer border border-secondary/50 bg-none px-2 !text-12 text-black 2xl:!text-14 ${
                  currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined
                } `}
                onClick={() => handleChangePage(`${currentPage + 1}`)}
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink
                className={`h-[36px] w-auto cursor-pointer border border-secondary/50 bg-none px-2 text-12 text-black 2xl:text-14`}
                onClick={() => handleChangePage(`${totalPages}`)}
              >
                <p className="text-12 2xl:text-14">{`Last >>`}</p>
              </PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>

        <div className="text-nowrap">
          {/* TODO: WILL UNCOMMENT AFTER BE FIX */}
          <p className="text-12 2xl:text-14">
            Showing{" "}
            <span className="font-bold">
              {(pagination.offset ?? 0) + 1} -{" "}
              {Math.min((pagination.offset ?? 0) + (pagination.limit ?? 0), totalPage ?? 0)}
            </span>{" "}
            of <span className="font-bold">{totalPage ?? 0}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;