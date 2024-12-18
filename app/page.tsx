"use client";

import { DataForm } from "@/components/Forms/DataForm";
import { useApp } from "./hooks/useApp";

export default function Home() {
  const { form, handlePostData, isLoading, data } = useApp();

  return (
    <div className="min-h-screen p-8">
      <div className="w-11/12 min-h-[calc(100dvh-4rem)] mx-auto grid grid-cols-2 gap-4">
        <div className="rounded-md bg-white p-6">
          <DataForm
            form={form}
            handlePostData={handlePostData}
            isLoading={isLoading}
          />
        </div>

        <div className="rounded-md bg-white p-6 flex flex-col gap-4">
          {data ? (
            <>
              <div>
                <h1 className="text-2xl font-bold">Predicition</h1>
                <p className="text-14">{data?.message}</p>
              </div>

              <div>
                <h1 className="text-2xl font-bold">Recommendation</h1>
                <p className="text-14 text-justify">{data?.recommendation}</p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-2xl font-bold">No data to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
