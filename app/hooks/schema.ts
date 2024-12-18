import { z } from 'zod';

export const schema = z.object({
  pregnancies: z.string().min(1, "Number of pregnancies is required").transform(Number),
  glucose: z.string().min(1, "Glucose level is required").transform(Number),
  blood_pressure: z.string().min(1, "Blood pressure is required").transform(Number),
  skin_thickness: z.string().min(1, "Skin thickness is required").transform(Number),
  insulin: z.string().min(1, "Insulin level is required").transform(Number),
  bmi: z.string().min(1, "BMI is required").transform(Number),
  diabetes_pedigree: z.string().min(1, "Diabetes pedigree is required").transform(Number),
  age: z.string().min(1, "Age is required").transform(Number)
});

export type SchemaType = z.infer<typeof schema>;