"use client"

import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CustomInputProps {
  form: any;
  name: any;
  label: string;
  placeholder?: string;
  type?: "text";
}

export const CustomInput: React.FC<CustomInputProps> = ({
  form,
  name,
  label,
  placeholder,
  type = "text",
}) => {

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-10 md:text-14">{label}<span className="text-red-500"> *</span></FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                {...field}
                placeholder={placeholder}
                type={type}
                className="w-full text-12 md:text-14 border-2"
              />
            </div>
          </FormControl>
          <FormMessage className="!text-10 text-red-500">{form.formState.errors[name]?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
};