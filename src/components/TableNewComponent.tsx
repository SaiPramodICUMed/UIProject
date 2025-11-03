import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "./ui/table";
 
import Badge from "./ui/badge/Badge";
 
// Interface matching your JSON structure
interface ColumnConfig {
  header: string;
  accessor: string;
  filterType?:
    | "text"
    | "autocomplete"
    | "select"
    | "multiSelect"
    | "range"
    | "dateRange";
  filterOptions?: string[] | number[];
}
interface TableProps {
  data: Record<string, any>[];
  columns: ColumnConfig[];
  height?: string;
  color?: string;
}
const TableNewComponent: React.FC<TableProps> = ({
  data,
  columns,
  height = "500px",
  color = "blue",
}) => {
  const formatToDate = (isoString: string) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatToUSCurrency = (value: string | number) => {
    const num = Number(value);
    if (isNaN(num)) return "";
    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

    function getDaysFromToday(dateString: string): string {
    if (!dateString) return "0 days";
    const givenDate = new Date(dateString);
    const today = new Date();

    givenDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - givenDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    return `- ${diffDays} days`;
  }

console.log("Data in TableNewComponent:", data,columns, height, color);
  return (
  <div
  className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]"
  style={{
    maxHeight: height,
    width: "100%",
    overflow: "hidden",
  }}
>
  {/* ✅ Constrain scroll strictly inside this block */}
  <div className="overflow-x-auto w-full" style={{ maxWidth: "100%", overflowY: "auto" }}>
    <div className="inline-block min-w-full align-middle">
      <Table className="w-full border-collapse">
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05] bg-blue-800 sticky top-0 z-10">
          <TableRow>
            {columns.map((col: any, index: number) => (
              <TableCell
                key={index}
                isHeader
                className="px-5 py-3 font-semibold text-white text-start text-sm whitespace-nowrap"
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05] text-xs">
          {data.map((row) => (
            <TableRow key={row.TaskId} className="hover:bg-gray-50">
               {columns.map((col, colIndex) => (
              <TableCell className="px-5 py-4 sm:px-6 text-start whitespace-nowrap"
              //  title={String(col.accessor === "Created" ||
              //         col.accessor === "LastModified"
              //           ? formatToDate(row[col.accessor])
              //           : col.accessor === "FloorBreaks"
              //           ? `${row[col.accessor]} (${row.FloorBreaksP}%)`
              //           : col.accessor === "OriginalValue"
              //           ? formatToUSCurrency(row[col.accessor])
              //           : col.accessor === "Due"
              //           ? getDaysFromToday(row[col.accessor])
              //           : row[col.accessor])} 
              //           key={row[col.accessor]}
              >
                 {col.accessor === "Created" ||
                      col.accessor === "LastModified"
                        ? formatToDate(row[col.accessor])
                        : col.accessor === "FloorBreaks"
                        ? `${row[col.accessor]} (${row.FloorBreaksP}%)`
                        : col.accessor === "OriginalValue"
                        ? formatToUSCurrency(row[col.accessor])
                        : col.accessor === "Due"
                        ? getDaysFromToday(row[col.accessor])
                        : row[col.accessor]}
              </TableCell>))}
              {/* <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {task.Name}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {task.Owner}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {task.CustomerSegment}
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {task.CountryName}
              </TableCell>
              <TableCell className="px-4 py-3 text-start whitespace-nowrap">
                <Badge
                  size="sm"
                  color={
                    task.Status === "Declined"
                      ? "error"
                      : task.Status === "Active"
                      ? "success"
                      : "warning"
                  }
                >
                  {task.Status}
                </Badge>
              </TableCell>
              <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {task.Value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
</div>

  );
}
 
 export default TableNewComponent;