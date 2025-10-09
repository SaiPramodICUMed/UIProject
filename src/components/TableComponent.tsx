import React from "react";

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  data: Record<string, any>[];
  columns: Column[];
  height?: string;
}

const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  height = "500px",
}) => {
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
                className="border border-black px-4 py-2 text-left font-semibold whitespace-nowrap"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-white text-gray-800">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${
                rowIndex % 2 === 0 ? "bg-[#e0e1f2]" : "bg-white"
              } hover:bg-gray-100`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="border px-4 py-2 whitespace-nowrap"
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
