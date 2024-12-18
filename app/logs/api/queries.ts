import { useQuery } from "@tanstack/react-query";
import { GetLogParams, GetLogResponse } from "./interface";
import { getLogs } from "@/services/Log.service";
import { getLogExport } from "@/services/Export.service";

export const useGetLogs = (params: GetLogParams) => {
  return useQuery<GetLogResponse, Error>({
    queryKey: ['log', params],
    queryFn: () => getLogs(params)
  })
};

export const useGetLogExport = () => {
  return useQuery<void, Error>({
    queryKey: ['logExport'],
    queryFn: getLogExport,
    enabled: false
  });
};