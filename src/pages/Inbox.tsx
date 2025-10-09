import React, { useState } from "react";
import TableComponent from "../components/TableComponent";
import Pagination from "../components/PageNation";

const Inbox: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Status", accessor: "status" },
  ];

  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 2 === 0 ? "Admin" : "Editor",
    status: i % 3 === 0 ? "Active" : "Pending",
  }));

  return (
    <div className="bg-white p-6">
         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
         <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {/* <FaHome className="text-blue-600" /> */}
      <span className="font-medium hover:text-blue-700 cursor-pointer">Inbox</span>

      {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
      {/* <span className="font-medium hover:text-blue-700 cursor-pointer">Inbox</span> */} 
/
      {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
      <span className="text-gray-500 font-medium">Inbox</span>
    </nav>
    
        {/* <h2 className="text-xl font-semibold text-blue-700">User Details</h2> */}

        <input
          type="text"
          placeholder="Search..."
         // value={searchTerm}
         // onChange={(e) => setSearchTerm(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {/* Responsive Table inside the same container */}
      <TableComponent data={data} columns={columns} height="450px" />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Inbox;
