export type PostDataRequest = {
  pregnancies: number;
  glucose: number;
  blood_pressure: number;
  skin_thickness: number;
  insulin: number;
  bmi: number;
  diabetes_pedigree: number;
  age: number;
}

export type PostDataResponse = {
  message: string;
  prediction: number;
  recommendation: string;
}