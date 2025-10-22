import React, { useMemo, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

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

const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  height = "500px",
  color = "blue",
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const [filters, setFilters] = useState<Record<string, any>>({});
  const [openFilter, setOpenFilter] = useState<string | null>(null);
const [dateFilterValues, setDateFilterValues] = useState<Record<string, [string, string]>>({});

  const tableRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (tableRef.current && !tableRef.current.contains(event.target as Node)) {
        setOpenFilter(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

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

  // ======= Utility Formatters =======
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

  // ======= Sorting =======
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

  const sortedData = useMemo(() => {
    if (!sortConfig) return data;
    const { key, direction } = sortConfig;
    return [...data].sort((a, b) => {
      const aVal = a[key];
      const bVal = b[key];
      const aNum = parseFloat(aVal);
      const bNum = parseFloat(bVal);
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return direction === "asc" ? aNum - bNum : bNum - aNum;
      }
      const aStr = (aVal ?? "").toString().toLowerCase();
      const bStr = (bVal ?? "").toString().toLowerCase();
      return direction === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, sortConfig]);

  // ======= Filtering =======
  const filteredData = useMemo(() => {
    return sortedData.filter((row) =>
      columns.every((col) => {
        const filter = filters[col.accessor];
        if (!filter) return true;
        const cellValue = row[col.accessor];

        switch (col.filterType) {
          case "text":
          case "autocomplete":
            return String(cellValue ?? "")
              .toLowerCase()
              .includes(String(filter).toLowerCase());

          case "select":
            return filter === "" || cellValue === filter;

          case "multiSelect":
            return filter.length === 0 || filter.includes(cellValue);

          case "range":
            const [min, max] = filter;
            const val = parseFloat(cellValue);
            if (min && val < parseFloat(min)) return false;
            if (max && val > parseFloat(max)) return false;
            return true;

          case "dateRange":
            const [start, end] = filter;
            const dateVal = new Date(cellValue);
            if (start && dateVal < new Date(start)) return false;
            if (end && dateVal > new Date(end)) return false;
            return true;

          default:
            return true;
        }
      })
    );
  }, [sortedData, filters, columns]);

  // ======= Filter Renderer =======
  const renderFilter = (col: ColumnConfig) => {
    const values =
      col.filterOptions && col.filterOptions.length > 0
        ? col.filterOptions
        : Array.from(new Set(data.map((d) => d[col.accessor]).filter(Boolean)));

    switch (col.filterType) {
      case "autocomplete": {
        const suggestions = values.filter((v) =>
          String(v).toLowerCase().includes((filters[col.accessor] ?? "").toLowerCase())
        );
        return (
          <div className="relative">
            <input
              type="text"
              className="w-full px-2 py-1 border rounded text-xs bg-white"
              placeholder="Search..."
              value={filters[col.accessor] ?? ""}
              onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
            />
            {filters[col.accessor] && suggestions.length > 0 && (
              <div className="absolute bg-white border rounded shadow max-h-32 overflow-y-auto z-50">
                {suggestions.map((s, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 text-xs hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleFilterChange(col.accessor, s)}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      case "select":
        return (
          <select
            className="w-full px-2 py-1 border rounded text-xs bg-white"
            value={filters[col.accessor] ?? ""}
            onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
          >
            <option value="">All</option>
            {values.map((v, i) => (
              <option key={i} value={v}>
                {v}
              </option>
            ))}
          </select>
        );

      case "multiSelect": {
        const selectedValues = filters[col.accessor] ?? [];
        const [searchTerm, setSearchTerm] = useState("");
        const filteredOptions = values.filter((v) =>
          v.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const allSelected = selectedValues.length === values.length;

        const buttonRef = useRef<HTMLDivElement>(null);
        const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 200 });

        const toggleDropdown = () => {
          if (!openFilter && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPos({
              top: rect.bottom + window.scrollY,
              left: rect.left + window.scrollX,
              width: 200,
            });
          }
          setOpenFilter(openFilter === col.accessor ? null : col.accessor);
        };

        return (
          <div className="relative w-full text-xs">
            <div
              ref={buttonRef}
              className="w-full px-2 py-1 border rounded cursor-pointer bg-white"
              onClick={toggleDropdown}
            >
              {selectedValues.length > 0 ? selectedValues.join(", ") : "Select options..."}
            </div>

            {openFilter === col.accessor &&
              createPortal(
                <div
                  style={{
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: 200,
                  }}
                  className="absolute z-50 bg-white border rounded shadow-lg max-h-64 overflow-y-auto"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-2 py-1 border-b text-xs bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="flex gap-1 px-2 py-1 border-b">
                    <button
                      className="flex-1 px-2 py-1 text-xs border rounded bg-gray-100 hover:bg-gray-200"
                      onClick={() => handleFilterChange(col.accessor, [...values])}
                      disabled={allSelected}
                    >
                      Select All
                    </button>
                    <button
                      className="flex-1 px-2 py-1 text-xs border rounded bg-gray-100 hover:bg-gray-200"
                      onClick={() => handleFilterChange(col.accessor, [])}
                      disabled={selectedValues.length === 0}
                    >
                      Unselect All
                    </button>
                  </div>
                  {filteredOptions.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        const newVals = selectedValues.includes(v)
                          ? selectedValues.filter((x:any) => x !== v)
                          : [...selectedValues, v];
                        handleFilterChange(col.accessor, newVals);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedValues.includes(v)}
                        readOnly
                        className="mr-2"
                      />
                      <span>{v}</span>
                    </div>
                  ))}
                  {filteredOptions.length === 0 && (
                    <div className="px-2 py-1 text-gray-500 text-xs">No options found</div>
                  )}
                </div>,
                document.body
              )}
          </div>
        );
      }

      case "range": {
        const staticMin: any = col.filterOptions?.[0] ?? 0;
        const staticMax: any = col.filterOptions?.[1] ?? 100;
        const [rangeValue, setRangeValue] = useState<number[]>([
          filters[col.accessor]?.[0] ?? staticMin,
          filters[col.accessor]?.[1] ?? staticMax,
        ]);

        const buttonRef = useRef<HTMLDivElement>(null);
        const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 200 });

        const toggleDropdown = () => {
          if (!openFilter && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPos({
              top: rect.bottom + window.scrollY,
              left: rect.left + window.scrollX,
              width: 200,
            });
          }
          setOpenFilter(openFilter === col.accessor ? null : col.accessor);
        };

        const handleChange = (index: 0 | 1, value: number) => {
          const newRange = [...rangeValue] as [number, number];
          if (index === 0) newRange[0] = Math.min(value, rangeValue[1]);
          else newRange[1] = Math.max(value, rangeValue[0]);
          setRangeValue(newRange);
          handleFilterChange(col.accessor, newRange);
        };

        const getPercent = (val: number) => ((val - staticMin) / (staticMax - staticMin)) * 100;

        return (
          <div className="relative w-full">
            <div
              ref={buttonRef}
              className="cursor-pointer border px-2 py-1 rounded text-xs bg-white"
              onClick={toggleDropdown}
            >
              {rangeValue[0]} - {rangeValue[1]}
            </div>

            {openFilter === col.accessor &&
              createPortal(
                <div
                  style={{
                    top: dropdownPos.top,
                    left: dropdownPos.left,
                    width: 200,
                  }}
                  className="absolute z-50 bg-white border rounded shadow-lg p-3"
                >
                  {/* Slider */}
                  <div className="relative w-full h-6 mb-4">
                    <div className="absolute top-1/2 -translate-y-1/2 h-2 w-full bg-gray-200 rounded"></div>
                    <div
                      className="absolute top-1/2 -translate-y-1/2 h-2 bg-blue-500 rounded"
                      style={{
                        left: `${getPercent(rangeValue[0])}%`,
                        width: `${getPercent(rangeValue[1]) - getPercent(rangeValue[0])}%`,
                      }}
                    />
                    <input
                      type="range"
                      min={staticMin}
                      max={staticMax}
                      value={rangeValue[0]}
                      onChange={(e) => handleChange(0, Number(e.target.value))}
                      className="absolute top-0 left-0 w-full h-6 appearance-none pointer-events-auto bg-transparent z-10"
                    />
                    <input
                      type="range"
                      min={staticMin}
                      max={staticMax}
                      value={rangeValue[1]}
                      onChange={(e) => handleChange(1, Number(e.target.value))}
                      className="absolute top-0 left-0 w-full h-6 appearance-none pointer-events-auto bg-transparent z-20"
                    />
                  </div>

                  <div className="flex justify-between gap-2">
                    <input
                      type="number"
                      value={rangeValue[0]}
                      min={staticMin}
                      max={rangeValue[1]}
                      onChange={(e) => handleChange(0, Number(e.target.value))}
                      className="w-1/2 px-2 py-1 border rounded text-xs"
                    />
                    <input
                      type="number"
                      value={rangeValue[1]}
                      min={rangeValue[0]}
                      max={staticMax}
                      onChange={(e) => handleChange(1, Number(e.target.value))}
                      className="w-1/2 px-2 py-1 border rounded text-xs"
                    />
                  </div>
                </div>,
                document.body
              )}
          </div>
        );
      }
case "dateRange": {
  const startDate = dateFilterValues[col.accessor]?.[0] ?? filters[col.accessor]?.[0] ?? "";
  const endDate = dateFilterValues[col.accessor]?.[1] ?? filters[col.accessor]?.[1] ?? "";
  const [custom, setCustom] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);

  const periods = ["Today", "1 Month", "3 Months", "6 Months", "1 Year", "2 Years"];

  const handlePeriod = (period: string) => {
    const today = new Date();
    let start: Date;

    switch (period) {
      case "Today": start = new Date(); break;
      case "1 Month": start = new Date(); start.setMonth(today.getMonth() - 1); break;
      case "3 Months": start = new Date(); start.setMonth(today.getMonth() - 3); break;
      case "6 Months": start = new Date(); start.setMonth(today.getMonth() - 6); break;
      case "1 Year": start = new Date(); start.setFullYear(today.getFullYear() - 1); break;
      case "2 Years": start = new Date(); start.setFullYear(today.getFullYear() - 2); break;
      default: start = today;
    }

    const s = start.toISOString().split("T")[0];
    const e = today.toISOString().split("T")[0];

    setDateFilterValues((prev) => ({ ...prev, [col.accessor]: [s, e] }));
    handleFilterChange(col.accessor, [s, e]);
    setSelectedPeriod(period);
    setCustom(false);
    setOpenFilter(null);
  };

  const handleCustomChange = (index: 0 | 1, value: string) => {
    const newRange: [string, string] = [...(dateFilterValues[col.accessor] ?? [startDate, endDate])] as [string, string];
    newRange[index] = value;
    setDateFilterValues((prev) => ({ ...prev, [col.accessor]: newRange }));
    handleFilterChange(col.accessor, newRange);
  };

  return (
    <div className="relative w-full">
      <div
        className="cursor-pointer border px-2 py-1 rounded text-xs bg-white shadow-sm hover:bg-gray-50 flex justify-between items-center"
        onClick={() => setOpenFilter(openFilter === col.accessor ? null : col.accessor)}
      >
        <span>{startDate && endDate ? `${startDate} - ${endDate}` : "Select Date"}</span>
        <span className="ml-2 text-gray-500">&#9662;</span>
      </div>

      {openFilter === col.accessor && (
        <div className="absolute z-50 top-full left-0 mt-1 w-64 p-3 bg-white border rounded shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {periods.map((period) => (
              <div
                key={period}
                className={`px-2 py-1 text-xs rounded cursor-pointer text-center hover:bg-[#0f59ac] ${
                  selectedPeriod === period ? "bg-[#0f59ac] text-white font-semibold" : "bg-gray-100 text-gray-800"
                }`}
                onClick={() => handlePeriod(period)}
              >
                {period}
              </div>
            ))}
          </div>

          <div
            className={`mt-3 px-2 py-1 text-xs rounded cursor-pointer text-center hover:bg-[#0f59ac] ${
              custom ? "bg-[#0f59ac] text-white font-semibold" : "bg-gray-100 text-gray-800"
            }`}
            onClick={() => setCustom(true)}
          >
            Custom
          </div>

          {custom && (
            <div className="flex flex-col gap-2 mt-2">
              <input
                type="date"
                value={startDate}
                onChange={(e) => handleCustomChange(0, e.target.value)}
                className="px-2 py-1 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => handleCustomChange(1, e.target.value)}
                className="px-2 py-1 border rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-400"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}


      default:
        return (
          <input
            type="text"
            placeholder="Search..."
            value={filters[col.accessor] ?? ""}
            onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
            className="w-full px-2 py-1 border rounded text-xs bg-white"
          />
        );
    }
  };

  return (
    <div ref={tableRef} className="w-full overflow-x-auto border rounded-lg shadow-sm bg-white" style={{ maxHeight: height }}>
      <table className="min-w-[800px] w-full border-collapse">
        <thead className="sticky top-0 bg-[#0f59ac] text-white z-10">
          <tr>
            {columns.map((col, i) => (
              <th
                key={i}
                onClick={() => handleSort(col.accessor)}
                className="border border-black px-4 py-2 text-left font-semibold text-xs cursor-pointer select-none"
              >
                <div className="flex justify-between items-center">
                  <span>{col.header}</span>
                  <span>
                    {sortConfig?.key === col.accessor
                      ? sortConfig.direction === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </span>
                </div>
              </th>
            ))}
          </tr>
          <tr className="bg-gray-100 text-gray-800">
            {columns.map((col, i) => (
              <th key={i} className="border border-gray-300 px-2 py-1">
                {renderFilter(col)}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredData.length ? (
            filteredData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={`cursor-pointer text-xs ${
                  rowIndex % 2 === 0 ? "bg-[#ebeff3]" : "bg-white"
                } hover:bg-[#d0e5f5]`}
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                   className={`border px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap ${colorClassMap[color]
                        ? colorClassMap[color]
                        : "text-gray-800"
                      } ${colIndex === 0 ? "min-w-[80px] w-[80px] max-w-[220px]" : "min-w-[80px] w-[80px] max-w-[220px]"}`}
                    title={String(row[col.accessor] ?? "")}
                  >
                    {col.accessor === "Created" ||col.accessor === "LastModified"
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
              <td colSpan={columns.length} className="text-center p-4 text-gray-500">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
