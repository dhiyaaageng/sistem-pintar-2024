import { cn } from "@/lib/utils";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Eye, SquarePen, Trash2 } from "lucide-react";

interface LogBodyProps {
  data?: {
    id: number;
    age: number;
    blood_pressure: number;
    bmi: number;
    diabetes_pedigree: number;
    glucose: number;
    insulin: number;
    pregnancies: number;
    skin_thickness: number;
    prediction_result: string;
    recommendation: string;
    timestamp: string;
  }[];
}

export const LogBody: React.FC<LogBodyProps> = ({
  data = [],
}) => {

  return (
    <TableBody className="text-12 overflow-y-auto">
      {data.length > 0 ? (
        data.map((item) => (
          <TableRow key={item.id} className="!max-h-[100px]">
            <TableCell className="text-primary-100">{item.id}</TableCell>
            <TableCell>{item.blood_pressure}</TableCell>
            <TableCell>{item.bmi}</TableCell>
            <TableCell>{item.diabetes_pedigree}</TableCell>
            <TableCell>{item.glucose}</TableCell>
            <TableCell>{item.insulin}</TableCell>
            <TableCell>{item.pregnancies}</TableCell>
            <TableCell>{item.skin_thickness}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.prediction_result}</TableCell>
            <TableCell>{item.recommendation}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={12} className="text-center">
            No data available.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
};