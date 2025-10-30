import React, { useState, useMemo } from "react";

interface PriceList {
  name: string;
  gpoName: string;
  description: string;
  headerId: string;
  contractId: string;
  startDate: string;
  endDate: string;
  active: string;
  sales: string;
  lastSaleDate: string;
  items: number;
}

interface PriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PriceList[];
  onSelect: (selected: PriceList[]) => void;
}

const PriceListModal: React.FC<PriceListModalProps> = ({
  isOpen,
  onClose,
  data,
  onSelect,
}) => {
  const [validFilter, setValidFilter] = useState("All");
  const [salesFilter, setSalesFilter] = useState("With 1 Year Sales");
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  if (!isOpen) return null;

  // const filteredData = useMemo(() => {
  //   return data.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(search.toLowerCase()) ||
  //       item.description.toLowerCase().includes(search.toLowerCase())
  //   );
  // }, [data, search]);

  // const paginatedData = useMemo(() => {
  //   const start = (currentPage - 1) * rowsPerPage;
  //   return filteredData.slice(start, start + rowsPerPage);
  // }, [filteredData, currentPage]);

  const toggleRowSelection = (index: number) => {
    const newSelection = new Set(selectedRows);
    newSelection.has(index) ? newSelection.delete(index) : newSelection.add(index);
    setSelectedRows(newSelection);
  };

  const handleAddSelection = () => {
   // const selected = paginatedData.filter((_, i) => selectedRows.has(i));
   // onSelect(selected);
    onClose();
  };

 // const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-2">
      <div className="bg-white w-full max-w-6xl rounded-lg shadow-lg flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center bg-blue-100 px-4 py-2 rounded-t-lg border-b">
          <h2 className="font-semibold text-lg text-gray-800">Price Lists</h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Filters */}
        <div className="p-4 border-b text-sm space-y-3 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-600 font-medium">
              Selection: <span className="text-gray-500">Not selected</span>
            </span>
            <button
              onClick={() => setSelectedRows(new Set())}
              className="text-blue-600 hover:underline"
            >
              Clear All
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-1">
              <span className="text-gray-700 font-medium">Valid Filter:</span>
              <select
                value={validFilter}
                onChange={(e) => setValidFilter(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>

            <label className="flex items-center gap-1">
              <span className="text-gray-700 font-medium">Sales Filter:</span>
              <select
                value={salesFilter}
                onChange={(e) => setSalesFilter(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              >
                <option>With 1 Year Sales</option>
                <option>Without 1 Year Sales</option>
              </select>
            </label>

            <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
              Load
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 w-full focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Table */}
        <div className="overflow-auto flex-1 text-sm px-6 pb-6">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-[#0f59ac] text-white text-left">
              <tr>
                {[
                  "Name",
                  "GPO Name",
                  "Description",
                  "Header Id",
                  "Contract ID",
                  "Start Date",
                  "End Date",
                  "Active",
                  "1 YR Sales",
                  "Last Sale Date",
                  "Items on Price List",
                ].map((header) => (
                  <th key={header} className="px-3 py-2 border border-gray-300 font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-blue-50 ${
                      selectedRows.has(index) ? "bg-blue-100" : "bg-white"
                    }`}
                    onClick={() => toggleRowSelection(index)}
                  >
                    <td className="px-3 py-2 border border-gray-200">{item.name}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.gpoName}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.description}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.headerId}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.contractId}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.startDate}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.endDate}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.active}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.sales}</td>
                    <td className="px-3 py-2 border border-gray-200">{item.lastSaleDate}</td>
                    <td className="px-3 py-2 border border-gray-200 text-center">{item.items}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center text-gray-500 py-6">
                    No price lists found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footer */}
        {/* <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-3 border-t text-sm gap-2">
          <div className="flex items-center gap-2">
            <button
              className="border px-2 py-1 rounded hover:bg-gray-100"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              ◀
            </button>
            <span>
              Page <strong>{currentPage}</strong> of {totalPages}
            </span>
            <button
              className="border px-2 py-1 rounded hover:bg-gray-100"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              ▶
            </button>
          </div>

          <button
            onClick={handleAddSelection}
            className="bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700"
          >
            Add Selection
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PriceListModal;
