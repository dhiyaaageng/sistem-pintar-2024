import { useEffect } from "react";
import { useGetLogs, useGetLogExport } from "../api/queries";

interface LogProps {
  limit: number;
  currentPage: number;
  tablePagination: any;
}

export const useLogs = ({ limit, currentPage, tablePagination }: LogProps) => {
  const logsQuery = useGetLogs({
    limit,
    currentPage
  });

  const exportQuery = useGetLogExport();

  const handleExport = () => {
    exportQuery.refetch();
  }

  useEffect(() => {
    if (!logsQuery.data?.total) return;
    tablePagination.handleCountChange(logsQuery.data.total ?? []);
  }, [logsQuery.data?.total, tablePagination]);

  return {
    data: logsQuery.data?.data,
    total: logsQuery.data?.total,
    isLoading: logsQuery.isLoading,
    handleExport,
  }
};

export default useLogs;