"use client";

import useLogs from "./hooks/useLogs";
import useTablePagination from "@/components/TablePagination/hooks/useTablePaginaton";

import TablePagination from "@/components/TablePagination";

import { LogHeader } from "./components/LogHeader";
import { LogBody } from "./components/LogBody";
import { Table } from "@/components/ui/table";
import { DynamicButton } from "@/components/DynamicButton";

export default function LogsComponent() {
  const tablePagination = useTablePagination();
  const { data, isLoading, total, handleExport } = useLogs({
    limit: tablePagination.pagination.limit,
    currentPage: tablePagination.currentPage,
    tablePagination,
  });

  return (
    <div className="min-h-screen p-8">
      <div className="w-11/12 min-h-[calc(100dvh-4rem)] mx-auto bg-white rounded-md p-8">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <h1 className="text-16 font-bold">Loading your logs...</h1>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-24 font-bold">
                Logs
              </h1>
              <DynamicButton
                className="bg-blue-500 text-white"
                onClick={handleExport}
                title="Export"
              />
            </div>
            <TablePagination
            tablePagination={tablePagination}
            count={total ?? 0}
            totalPage={total ?? 0}
          >
            <Table>
              <LogHeader
                headers={[
                  "Id",
                  "Blood Pressure",
                  "BMI",
                  "Diabetes Pedigree",
                  "Glucose",
                  "Insulin",
                  "Pregnancies",
                  "Skin Thickness",
                  "Age",
                  "Prediction Result",
                  "Recommendation",
                ]}
                size={[
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                  "auto",
                ]}
              />

              <LogBody data={data} />
            </Table>
          </TablePagination>
          </>
        )}
      </div>
    </div>
  );
}
