import {
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface LogHeaderProps {
  headers: string[];
  size: string[];
}

export const LogHeader: React.FC<LogHeaderProps> = ({ headers, size }) => {
  return (
    <TableHeader className="sticky top-0 bg-white z-10">
      <TableRow className="border-b border-primary-90 text-base 2xl:text-lg">
        {headers.map((header, index) => (
          <TableHead key={index} className={`font-bold !text-12 text-black w-[${size[index]}]`}>
            {header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  )
}