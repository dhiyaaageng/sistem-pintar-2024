import { CustomInput } from "../CustomInput";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";

import { DynamicButton } from "../DynamicButton";

interface DataFormProps {
  form: any;
  handlePostData: () => void;
  isLoading: boolean;
}

export const DataForm = ({
  form,
  handlePostData,
  isLoading,
}: DataFormProps) => {
  const router = useRouter();
  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePostData();
        }}
        className="flex flex-col h-full justify-between gap-2"
      >
        <div className="grid grid-cols-2 gap-2">
          <h1 className="text-2xl font-bold col-span-2">Diabetes Prediction</h1>
          <CustomInput form={form} label="Pregnancies" name="pregnancies" />
          <CustomInput form={form} label="Glucose" name="glucose" />
          <CustomInput
            form={form}
            label="Blood Pressure"
            name="blood_pressure"
          />
          <CustomInput
            form={form}
            label="Skin Thickness"
            name="skin_thickness"
          />
          <CustomInput form={form} label="Insulin" name="insulin" />
          <CustomInput form={form} label="BMI" name="bmi" />
          <CustomInput
            form={form}
            label="Diabetes Pedigree"
            name="diabetes_pedigree"
          />
          <CustomInput form={form} label="Age" name="age" />
        </div>
        <div className="flex gap-4">
          <DynamicButton
            title="Submit"
            loading={isLoading}
            className="w-full bg-[#f9afde] hover:bg-[#ff98d9] text-white"
          />

          <DynamicButton
            title="View Logs"
            type="button"
            onClick={() => router.push("/logs")}
            className="w-full bg-[#aff9af] hover:bg-[#98ff9a] text-white"
          />
        </div>
      </form>
    </Form>
  );
};
