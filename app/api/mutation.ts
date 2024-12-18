import { useMutation } from "@tanstack/react-query";
import { PostDataRequest, PostDataResponse } from "./interface";
import { postData } from "../../services/Data.service";

export const usePostData = () => {
  return useMutation<PostDataResponse, Error, PostDataRequest>({
    mutationFn: (payload) => postData(payload),
  })
}