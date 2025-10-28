import React, { useMemo, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Range } from "react-range";

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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null); // unified open state
  const [dateFilterValues, setDateFilterValues] = useState<
    Record<string, [string, string]>
  >({});

  const tableRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (!tableRef.current) return;

      const clickedInsideTable = tableRef.current.contains(target);
      const dropdownElements = document.querySelectorAll(".dropdown-portal");
      const clickedInsidePortal = Array.from(dropdownElements).some((el) =>
        el.contains(target)
      );

      if (!clickedInsideTable && !clickedInsidePortal) {
        setOpenDropdown(null);
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

    // ----- Autocomplete -----
    if (col.filterType === "autocomplete") {
      const suggestions = values.filter((v) =>
        String(v)
          .toLowerCase()
          .includes((filters[col.accessor] ?? "").toLowerCase())
      );
      return (
        <div className="relative">
          <input
            type="text"
            className="w-full px-2 py-1 border border-gray-400 rounded text-gray-550 text-xs bg-white"
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

    // ----- Select -----
    if (col.filterType === "select") {
      return (
        <select
          className="w-full px-2 py-1 border border-gray-400 rounded text-xs  text-gray-400 bg-white active:outline-none"
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
    }

    // ----- MultiSelect -----
    if (col.filterType === "multiSelect") {
      const selectedValues = filters[col.accessor] ?? [];
      const [searchTerm, setSearchTerm] = useState("");
      const filteredOptions = values.filter((v) =>
        v.toLowerCase().includes(searchTerm?.toLowerCase())
      );
      const allSelected = selectedValues.length === values.length;

      const buttonRef = useRef<HTMLDivElement>(null);
      const [dropdownPos, setDropdownPos] = useState({
        top: 0,
        left: 0,
        width: 200,
      });

      const toggleDropdown = () => {
        if (!openDropdown && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          setDropdownPos({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: 200,
          });
        }
        setOpenDropdown(openDropdown === col.accessor ? null : col.accessor);
      };

      return (
        <div className="relative w-full text-xs">
          <div
            ref={buttonRef}
            className="w-full px-2 py-1 border rounded cursor-pointer bg-white text-gray-400 dropdown-portal"
            onClick={toggleDropdown}
          >
            {selectedValues.length > 0
              ? selectedValues.join(", ")
              : "Select options..."}
          </div>

          {openDropdown === col.accessor &&
            createPortal(
              <div
                className="absolute z-50 bg-white border rounded shadow-lg max-h-64 overflow-y-auto dropdown-portal"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  width: 200,
                }}
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
                        ? selectedValues.filter((x: any) => x !== v)
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
                  <div className="px-2 py-1 text-gray-500 text-xs">
                    No options found
                  </div>
                )}
              </div>,
              document.body
            )}
        </div>
      );
    }

    // ----- Range -----
    if (col.filterType === "range") {
      const STATIC_MIN = Number(col.filterOptions?.[0] ?? 0);
      const STATIC_MAX = Number(col.filterOptions?.[1] ?? 100);

      const [rangeValue, setRangeValue] = useState<number[]>([
        filters[col.accessor]?.[0] ?? STATIC_MIN,
        filters[col.accessor]?.[1] ?? STATIC_MAX,
      ]);

      const buttonRef = useRef<HTMLDivElement>(null);
      const [dropdownPos, setDropdownPos] = useState({
        top: 0,
        left: 0,
        width: 240,
      });

      const toggleDropdown = () => {
        if (!openDropdown && buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          setDropdownPos({
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
          });
        }
        setOpenDropdown(openDropdown === col.accessor ? null : col.accessor);
      };

      const handleChange = (values: number[]) => {
        setRangeValue(values);
        handleFilterChange(col.accessor, values);
      };

      return (
        <div className="relative w-full">
          <div
            ref={buttonRef}
            onClick={toggleDropdown}
            className="cursor-pointer border px-2 py-1 rounded text-xs bg-white flex justify-between items-center text-gray-400 dropdown-portal"
          >
            {rangeValue[0]} - {rangeValue[1]}
            <span className="text-gray-400 ml-2">&#9662;</span>
          </div>

          {openDropdown === col.accessor &&
            createPortal(
              <div
                className="absolute z-50 bg-white border rounded shadow-lg p-4"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  width: 200,
                }}
              >
                <div className="w-full px-2 py-4 text-gray-400">
                  <Range
                    values={rangeValue}
                    step={1}
                    min={STATIC_MIN}
                    max={STATIC_MAX}
                    onChange={handleChange}
                    renderTrack={({ props, children }) => (
                      <div
                        {...props}
                        className="w-full h-1 bg-gray-200 rounded relative"
                      >
                        <div
                          className="absolute h-1 bg-blue-500 rounded"
                          style={{
                            left: `${
                              ((rangeValue[0] - STATIC_MIN) /
                                (STATIC_MAX - STATIC_MIN)) *
                              100
                            }%`,
                            width: `${
                              ((rangeValue[1] - rangeValue[0]) /
                                (STATIC_MAX - STATIC_MIN)) *
                              100
                            }%`,
                          }}
                        />
                        {children}
                      </div>
                    )}
                    renderThumb={({ props, index }) => (
                      <div
                        {...props}
                        className="h-4 w-4 bg-blue-600 rounded-full shadow-md flex items-center justify-center cursor-pointer"
                      >
                        <div className="absolute -top-5 text-xs bg-gray-800 text-white px-1 rounded">
                          {rangeValue[index]}
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="flex justify-between gap-2 mt-3">
                  <input
                    type="number"
                    value={rangeValue[0]}
                    min={STATIC_MIN}
                    max={rangeValue[1]}
                    onChange={(e) =>
                      handleChange([Number(e.target.value), rangeValue[1]])
                    }
                    className="w-1/2 px-2 py-1 border rounded text-xs"
                  />
                  <input
                    type="number"
                    value={rangeValue[1]}
                    min={rangeValue[0]}
                    max={STATIC_MAX}
                    onChange={(e) =>
                      handleChange([rangeValue[0], Number(e.target.value)])
                    }
                    className="w-1/2 px-2 py-1 border rounded text-xs"
                  />
                </div>
              </div>,
              document.body
            )}
        </div>
      );
    }

    // ----- DateRange -----
    if (col.filterType === "dateRange") {
      const [custom, setCustom] = useState(false);
      const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
      const buttonRef = useRef<HTMLDivElement | null>(null);
      const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

      const startDate =
        dateFilterValues[col.accessor]?.[0] ?? filters[col.accessor]?.[0] ?? "";
      const endDate =
        dateFilterValues[col.accessor]?.[1] ?? filters[col.accessor]?.[1] ?? "";

      const periods = [
        "Today",
        "1 Month",
        "3 Months",
        "6 Months",
        "1 Year",
        "2 Years",
      ];

      useEffect(() => {
        if (buttonRef.current && openDropdown === col.accessor) {
          const rect = buttonRef.current.getBoundingClientRect();
          setDropdownPos({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
          });
        }
      }, [openDropdown]);

      const handlePeriod = (period: string) => {
        const today = new Date();
        let start = new Date();

        switch (period) {
          case "1 Month":
            start.setMonth(today.getMonth() - 1);
            break;
          case "3 Months":
            start.setMonth(today.getMonth() - 3);
            break;
          case "6 Months":
            start.setMonth(today.getMonth() - 6);
            break;
          case "1 Year":
            start.setFullYear(today.getFullYear() - 1);
            break;
          case "2 Years":
            start.setFullYear(today.getFullYear() - 2);
            break;
          default:
            start = today;
        }

        const s = start.toISOString().split("T")[0];
        const e = today.toISOString().split("T")[0];

        setDateFilterValues((prev) => ({ ...prev, [col.accessor]: [s, e] }));
        handleFilterChange(col.accessor, [s, e]);
        setSelectedPeriod(period);
        setCustom(false);
        setOpenDropdown(null);
      };

      const handleCustomChange = (index: 0 | 1, value: string) => {
        const newRange: [string, string] = [
          ...(dateFilterValues[col.accessor] ?? [startDate, endDate]),
        ] as [string, string];
        newRange[index] = value;
        setDateFilterValues((prev) => ({
          ...prev,
          [col.accessor]: newRange,
        }));
        handleFilterChange(col.accessor, newRange);
      };

      return (
        <>
          <div
            ref={buttonRef}
            className="cursor-pointer border px-2 py-1 rounded text-xs text-gray-400 bg-white shadow-sm hover:bg-gray-50 flex justify-between items-center"
            onClick={() =>
              setOpenDropdown(
                openDropdown === col.accessor ? null : col.accessor
              )
            }
          >
            <span>
              {startDate && endDate
                ? `${startDate} - ${endDate}`
                : "Select Date"}
            </span>
            <span className="ml-2 text-gray-500">&#9662;</span>
          </div>

          {openDropdown === col.accessor &&
            createPortal(
              <div
                className="absolute z-50 w-64 p-3 bg-white border rounded shadow-lg dropdown-portal"
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                }}
              >
                <div className="grid grid-cols-2 gap-2">
                  {periods.map((period) => (
                    <div
                      key={period}
                      className={`px-2 py-1 text-xs rounded cursor-pointer text-center hover:bg-blue-100 ${
                        selectedPeriod === period
                          ? "bg-[#0f59ac] text-white font-semibold"
                          : "bg-gray-100 text-gray-800"
                      }`}
                      onClick={() => handlePeriod(period)}
                    >
                      {period}
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-3 px-2 py-1 text-xs rounded cursor-pointer text-center hover:bg-blue-100 ${
                    custom
                      ? "bg-[#0f59ac] text-white font-semibold"
                      : "bg-gray-100 text-gray-800"
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
              </div>,
              document.body
            )}
        </>
      );
    }

    // ----- Default -----
    return (
      <input
        type="text"
        placeholder="Search..."
        value={filters[col.accessor] ?? ""}
        onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
        className="w-full px-2 py-1 border border-gray-400 rounded text-xs text-gray-550 bg-white"
      />
    );
  };

  function handleClick(row:any) {
    console.log("Row clicked:", row);
  }

  return (
    <div
      ref={tableRef}
      className="w-full overflow-x-auto shadow-sm bg-white"
    >
      <div
        className={`overflow-auto md:h-[62vh] border border-gray-300`}
      >
        <table className="min-w-[800px] w-full border-collapse">
          {/* Header */}
          <thead className="sticky top-0 bg-[#0f59ac] text-white z-20">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  onClick={() => handleSort(col.accessor)}
                  className="border border-gray-500 px-4 py-2 text-left font-semibold text-xs cursor-pointer select-none bg-[#0f59ac]"
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
            {/* Filters */}
      {/* <tr className="bg-gray-100 text-gray-800">
        {columns.map((col, i) => {
          return (
            <th
              key={i}
              className={`border border-gray-500 px-2 py-1`}
      
            >
              {renderFilter(col)}
            </th>
          );
        })}
      </tr> */}
          </thead>

          {/* Body */}
          <tbody className={`text-${color}-800` }>
            {filteredData.length ? (
              filteredData.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`cursor-pointer text-xs ${
                    rowIndex % 2 === 0 ? "bg-[#ebeff3]" : "bg-white"
                  } hover:bg-[#d0e5f5]`}
                  onClick={()=>{handleClick(row)}}
                >
                  {columns.map((col, colIndex) => (
                    <td
                      key={colIndex}
                      className="border border-gray-500 px-4 py-2 overflow-hidden text-ellipsis whitespace-nowrap min-w-[80px] w-[80px] max-w-[220px]"
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
              <tr className="border-gray-500">
                <td
                  colSpan={columns.length}
                  className="text-center p-4 text-gray-500 border border-gray-500"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
