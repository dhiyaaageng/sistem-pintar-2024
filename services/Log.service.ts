import API from ".";
import { GetLogParams, GetLogResponse } from "@/app/logs/api/interface";

export const getLogs = async (params: GetLogParams): Promise<GetLogResponse> => {
  const response = await API.get<GetLogResponse>("/logs", { params });
  return response.data;
}