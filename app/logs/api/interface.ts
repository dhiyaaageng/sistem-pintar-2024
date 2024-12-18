export interface GetLogParams {
  limit: number
  currentPage: number
}

export interface GetLogResponse {
  data: {
    age: number
    blood_pressure: number
    bmi: number
    diabetes_pedigree: number
    glucose: number
    id: number
    insulin: number
    prediction_result: string
    pregnancies: number
    recommendation: string
    skin_thickness: number
    timestamp: string
  }[],
  limit: number
  offset: number
  total: number
  currentPage: number
}