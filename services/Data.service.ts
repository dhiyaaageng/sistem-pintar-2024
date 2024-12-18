import API from "@/services";
import { PostDataRequest, PostDataResponse } from "../app/api/interface";

export const postData = async (data: PostDataRequest): Promise<PostDataResponse> => {
  const response = await API.post<PostDataResponse>("/predict", data);
  return response.data;
}
