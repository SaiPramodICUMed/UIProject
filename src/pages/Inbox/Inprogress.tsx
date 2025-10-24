import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import Pagination from "../../components/PageNation";
import axios from "axios";
import Loader from "../../components/loader";
import { useSelector } from "react-redux";
//import data from "../../../data.json";

const Inprogress: React.FC = () => {
  const user = useSelector((state: any) => state.user.users);
  const taskCount = useSelector((state: any) => state.user.taskCount);
  const [inboxData, setInboxData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords] = useState(taskCount.inProgress);
  const [recordsPerPage, setRecordsPerPage] = useState(user.gridPageSize);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / user.gridPageSize));

  //const intervel=user.gridPageSize;
  // const totalPages = Math.ceil(totalRecords / user.gridPageSize);

  const setPageChange = (pageNumber: any, listPerPage?: any) => {
    const noOfrecordsPerPage = listPerPage ? listPerPage : recordsPerPage
    setCurrentPage(pageNumber);
    let start = pageNumber == 0 ? 1 : (pageNumber - 1) * noOfrecordsPerPage + 1;
    let end =
      pageNumber == 0 ? user.gridPageSize : pageNumber * noOfrecordsPerPage;
    console.log(start, end);
    fetchData("inprogress", start, end);
  };

  const changeRecordsPerPage = (recordsPerPage: any) => {
    console.log("on count change", recordsPerPage);
    setRecordsPerPage(recordsPerPage);
    setTotalPages(Math.ceil(totalRecords / recordsPerPage))
    setPageChange(1, recordsPerPage);
  };

  const columns:any = [
    { header: "Task Name", accessor: "Name", filterType:"text",filterOptions: ["Active", "Inactive", "Pending"], },
    { header: "Task Type", accessor: "TaskType", filterType:"select",filterOptions: ["Activedsfsfdsdfsf", "Inactive", "Pending"],  },
    { header: "Status", accessor: "TaskStatus", filterType:"autocomplete", filterOptions: ["Active", "Inactive", "Pending"],  },
    { header: "Account Names", accessor: "AccountNames" },
    { header: "Buying Group Names", accessor: "BuyingGroupNames" },
    { header: "Next", accessor: "FAO",filterType:"autocomplete" },
    { header: "Creator", accessor: "Owner", filterType:"multiSelect", filterOptions: ["Actived", "Inactive", "Pending"],},
    { header: "Created", accessor: "Created", filterType:"range" },
    { header: "Last Modified", accessor: "LastModified" , filterType:"dateRange"},
    { header: "Items", accessor: "ItemCount" },
    { header: "Value", accessor: "OriginalValue" },
    { header: "Floor Breaks", accessor: "FloorBreaks" },
    { header: "Due", accessor: "Due" },
    { header: "Country", accessor: "CountryName" },    
  ];

  const fetchData = async (arg: any, start: number, end: number) => {
    console.log(arg, start, end);
   // setLoading(true);
    //setActiveTab(arg);
    try {
      const payload = {
        viewName: `dbo.Inbox_Tasks(${user.userId})`,
        firstRow: start,
        lastRow: end,
        sortBy: "DeadlineOrdered",
        sortByDirection: "asc",
        filter: `AND (  1 <> 1  OR tab = '${arg}' )  AND tab = '${arg}'`,
        fieldList: "*",
        timeout: 0,
      };

      // 👈 second argument is the body (data)
      const response = await axios.post(
        `https://10.2.6.130:5000/api/Metadata/getData`,
        payload,
        { headers: { "Content-Type": "application/json" } } // optional config
      );

      console.log("API Response:", response.data);
      setInboxData(response.data);
      setLoading(false);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchData("inprogress", 1, user.gridPageSize);
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / recordsPerPage))
  }, [recordsPerPage]);

  return (
    <div className="bg-white p-6">
      <Loader isLoad={loading} />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          {/* <FaHome className="text-blue-600" /> */}
          <span className="font-medium">Inbox</span>
          {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
          {/* <span className="font-medium hover:text-blue-700 cursor-pointer">Inbox</span> */}
          /{/* <FaChevronRight className="text-gray-400 text-xs" /> */}
          <span className="text-gray-500 font-medium">Inprogress</span>
        </nav>

        {/* <h2 className="text-xl font-semibold text-blue-700">User Details</h2> */}


      </div>
      {/* Responsive Table inside the same container */}
      <TableComponent
        data={inboxData}
        columns={columns}
        height="450px"
        color="red"
      />
      {inboxData?.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalRecords={totalRecords}
          recordsPerPage={recordsPerPage}
          onPageChange={setPageChange}
          onRecordsPerPageChange={(val) => {
            changeRecordsPerPage(val);
            //setPageChange(1); // reset to first page on change
          }}
        />
      )}
    </div>
  );
};

export default Inprogress;
// import React, { useMemo, useState } from "react";

// interface ColumnConfig {
//   header: string;
//   accessor: string;
//   filterType?: "text" | "select" | "autocomplete" | "dateRange";
//   options?: string[]; // for select
// }

// interface TableProps {
//   data: Record<string, any>[];
//   columns: ColumnConfig[];
//   height?: string;
//   color?: string;
// }

// const TableComponent: React.FC<TableProps> = ({
//   data,
//   columns,
//   height = "500px",
//   color = "blue",
// }) => {
//   const [sortConfig, setSortConfig] = useState<{
//     key: string;
//     direction: "asc" | "desc";
//   } | null>(null);

//   const [filters, setFilters] = useState<Record<string, any>>({});

//   const handleFilterChange = (key: string, value: any) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleRowClick = (row: Record<string, any>) => {
//     console.log("Row clicked:", row);
//   };

//   // sorting
//   const handleSort = (accessor: string) => {
//     if (sortConfig?.key === accessor) {
//       setSortConfig({
//         key: accessor,
//         direction: sortConfig.direction === "asc" ? "desc" : "asc",
//       });
//     } else {
//       setSortConfig({ key: accessor, direction: "asc" });
//     }
//   };

//   const sortedData = useMemo(() => {
//     if (!sortConfig) return data;
//     const { key, direction } = sortConfig;
//     return [...data].sort((a, b) => {
//       let aValue = a[key];
//       let bValue = b[key];
//       aValue = typeof aValue === "number" ? aValue : aValue?.toString()?.toLowerCase() ?? "";
//       bValue = typeof bValue === "number" ? bValue : bValue?.toString()?.toLowerCase() ?? "";
//       if (aValue < bValue) return direction === "asc" ? -1 : 1;
//       if (aValue > bValue) return direction === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [data, sortConfig]);

//   // filtering
//   const filteredData = useMemo(() => {
//     return sortedData.filter((row) =>
//       columns.every((col) => {
//         const filterValue = filters[col.accessor];
//         if (!filterValue) return true;

//         if (col.filterType === "dateRange" && Array.isArray(filterValue)) {
//           const [start, end] = filterValue;
//           const rowDate = new Date(row[col.accessor]);
//           if (start && rowDate < new Date(start)) return false;
//           if (end && rowDate > new Date(end)) return false;
//           return true;
//         }

//         const cellValue = String(row[col.accessor] ?? "").toLowerCase();
//         return cellValue.includes(String(filterValue).toLowerCase());
//       })
//     );
//   }, [sortedData, filters, columns]);

//   const renderFilter = (col: ColumnConfig) => {
//     switch (col.filterType) {
//       case "select":
//         return (
//           <select
//             className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
//             value={filters[col.accessor] ?? ""}
//             onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
//           >
//             <option value="">All</option>
//             {col.options?.map((opt, i) => (
//               <option key={i} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         );

//       case "autocomplete":
//         const suggestions = Array.from(
//           new Set(data.map((d) => d[col.accessor]).filter(Boolean))
//         ).filter((val) =>
//           String(val)
//             .toLowerCase()
//             .includes((filters[col.accessor] ?? "").toLowerCase())
//         );

//         return (
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search..."
//               className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
//               value={filters[col.accessor] ?? ""}
//               onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
//             />
//             {filters[col.accessor] && suggestions.length > 0 && (
//               <div className="absolute bg-white border border-gray-300 mt-1 rounded shadow max-h-40 overflow-y-auto z-10">
//                 {suggestions.map((s, i) => (
//                   <div
//                     key={i}
//                     onClick={() => handleFilterChange(col.accessor, s)}
//                     className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-xs"
//                   >
//                     {s}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         );

//       case "dateRange":
//         return (
//           <div className="flex flex-col gap-1 text-xs">
//             <input
//               type="date"
//               value={filters[col.accessor]?.[0] ?? ""}
//               onChange={(e) =>
//                 handleFilterChange(col.accessor, [
//                   e.target.value,
//                   filters[col.accessor]?.[1] ?? "",
//                 ])
//               }
//               className="w-full px-1 py-1 border border-gray-300 rounded"
//             />
//             <input
//               type="date"
//               value={filters[col.accessor]?.[1] ?? ""}
//               onChange={(e) =>
//                 handleFilterChange(col.accessor, [
//                   filters[col.accessor]?.[0] ?? "",
//                   e.target.value,
//                 ])
//               }
//               className="w-full px-1 py-1 border border-gray-300 rounded"
//             />
//           </div>
//         );

//       default:
//         return (
//           <input
//             type="text"
//             placeholder="Search..."
//             className="w-full px-2 py-1 border border-gray-300 rounded text-xs"
//             value={filters[col.accessor] ?? ""}
//             onChange={(e) => handleFilterChange(col.accessor, e.target.value)}
//           />
//         );
//     }
//   };

//   return (
//     <div
//       className="w-full overflow-x-auto border rounded-lg shadow-sm bg-white"
//       style={{ maxHeight: height }}
//     >
//       <table className="min-w-[800px] w-full border-collapse">
//         <thead className="sticky top-0 bg-[#0f59ac] text-white z-10">
//           <tr>
//             {columns.map((col, i) => (
//               <th
//                 key={i}
//                 onClick={() => handleSort(col.accessor)}
//                 className="border border-black px-4 py-2 text-left font-semibold text-xs cursor-pointer select-none"
//               >
//                 <div className="flex justify-between items-center">
//                   <span>{col.header}</span>
//                   <span>
//                     {sortConfig?.key === col.accessor
//                       ? sortConfig.direction === "asc"
//                         ? "▲"
//                         : "▼"
//                       : ""}
//                   </span>
//                 </div>
//               </th>
//             ))}
//           </tr>
//           <tr className="bg-gray-100 text-gray-800">
//             {columns.map((col, i) => (
//               <th key={i} className="border border-gray-300 px-2 py-1">
//                 {renderFilter(col)}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length ? (
//             filteredData.map((row, rowIndex) => (
//               <tr
//                 key={rowIndex}
//                 onClick={() => handleRowClick(row)}
//                 className={`cursor-pointer text-xs ${
//                   rowIndex % 2 === 0 ? "bg-[#ebeff3]" : "bg-white"
//                 } hover:bg-[#d0e5f5]`}
//               >
//                 {columns.map((col, colIndex) => (
//                   <td
//                     key={colIndex}
//                     className="border px-4 py-2 whitespace-nowrap"
//                     title={String(row[col.accessor] ?? "")}
//                   >
//                     {String(row[col.accessor] ?? "")}
//                   </td>
//                 ))}
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan={columns.length}
//                 className="text-center p-4 text-gray-500"
//               >
//                 No records to display.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default TableComponent;

