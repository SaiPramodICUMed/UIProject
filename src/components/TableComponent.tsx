import React from "react";

interface TableProps {
  data: Record<string, any>[];
  columns: any[];
  height?: string;
  color?: string;
}

const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  height = "500px",
  color = "blue",
}) => {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  console.log(color)
  const handleRowClick = (row: Record<string, any>) => {
    console.log("Row clicked:", row);
  };

  function formatToDate(isoString: string): string {
    if (!isoString) return "";

    const date = new Date(isoString);
    if (isNaN(date.getTime())) return "";

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function formatToUSCurrency(value: string | number): string {
    const num = Number(value);
    if (isNaN(num)) return "";

    return num.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  const colorClassMap: Record<string, string> = {
    blue: "text-blue-800",
    red: "text-red-800",
    green: "text-green-800",
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

  // Handle sorting
  const handleSort = (accessor: string) => {
    if (sortConfig?.key === accessor) {
      setSortConfig({
        key: accessor,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key: accessor, direction: "asc" });
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
   // console.log("equal");
    const { key, direction } = sortConfig;

    return [...data].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];

      // Handle numbers
      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else {
        aValue = aValue?.toString() ?? "";
        bValue = bValue?.toString() ?? "";
      }

      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  return (
    <div
      className="w-full overflow-x-auto border rounded-lg shadow-sm bg-white"
      style={{ maxHeight: height }}
    >
      <table className="min-w-[800px] w-full border-collapse">
        {/* Table Header */}
        <thead className="sticky top-0 bg-[#0f59ac] text-white z-10">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                onClick={() => handleSort(col.accessor)}
                className="border border-black px-4 py-2 text-left font-semibold text-xs whitespace-nowrap cursor-pointer select-none"
              >
                <div className="flex justify-between items-center">
                  <span>{col.header}</span>
                  <span>
                    {sortConfig?.key === col.accessor
                      ? sortConfig?.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white text-gray-800">
          {sortedData.length != 0 ? (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                onClick={() => handleRowClick(row)}
                className={`cursor-pointer text-xs  ${
                  rowIndex % 2 === 0 ? "bg-[#ebeff3]" : "bg-white"
                } hover:bg-[#d0e5f5]`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className={`border px-4 py-2 max-w-[60px] overflow-hidden text-ellipsis whitespace-nowrap ${
                      colorClassMap[color]
                        ? colorClassMap[color]
                        : "text-gray-800"
                    }`}
                    title={String(row[col.accessor] ?? "")}
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
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-4 text-gray-500"
              >
                No records to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
