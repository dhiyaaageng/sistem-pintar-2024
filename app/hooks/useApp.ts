import { useForm, UseFormReturn } from "react-hook-form";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { UseMutationResult } from "@tanstack/react-query";
import { schema, SchemaType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePostData } from "../api/mutation";
import { PostDataRequest, PostDataResponse } from "../api/interface";
import { AxiosError } from "axios";

import { toast } from "sonner";

interface HandlePostDataProps {
  form: UseFormReturn<SchemaType>;
  mutations: UseMutationResult<PostDataResponse, Error, PostDataRequest>;
  queryClient: QueryClient;
}

const handlePostData = async ({ form, mutations, queryClient }: HandlePostDataProps) => {
  const values = form.getValues();

  const payload = {
    pregnancies: values.pregnancies,
    glucose: values.glucose,
    blood_pressure: values.blood_pressure,
    skin_thickness: values.skin_thickness,
    insulin: values.insulin,
    bmi: values.bmi,
    diabetes_pedigree: values.diabetes_pedigree,
    age: values.age,
  };

  mutations.mutate(payload, {
    onSuccess: () => {
      toast.success("Data has been successfully submitted");
      queryClient.invalidateQueries({ queryKey: ["log"]})
      form.reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("An error occurred");
      }
    },
  });
};

export const useApp = () => {
  const postDataMutation = usePostData();
  const queryClient = useQueryClient();

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      pregnancies: 0,
      glucose: 0,
      blood_pressure: 0,
      skin_thickness: 0,
      insulin: 0,
      bmi: 0,
      diabetes_pedigree: 0,
      age: 0,
    },
  });

  return {
    form,
    data: postDataMutation.data,
    isLoading: postDataMutation.isPending,
    handlePostData: () => handlePostData({ form, mutations: postDataMutation, queryClient }),
  };
};
