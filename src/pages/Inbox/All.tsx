import React, { useEffect, useState } from "react";
import TableComponent from "../../components/TableComponent";
import Pagination from "../../components/PageNation";
import axios from "axios";
import Loader from "../../components/loader";

const All: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inboxData, setInboxData] = useState([]);
    const [loading,setLoading]=useState(false);
  const totalPages = 10;
  const columns = [   
    { header: "Task Name", accessor: "Name" },
    { header: "Task Type", accessor: "TaskType" },
    { header: "Status", accessor: "TaskStatus" },
    { header: "Creator", accessor: "Owner" },
    { header: "Created", accessor: "Created" },
    { header: "Last Modified", accessor: "LastModified" },
    { header: "Items", accessor: "ItemCount" },
    { header: "Value", accessor: "OriginalValue" },
    { header: "Floor Breaks", accessor: "FloorBreaks" },
    { header: "Country", accessor: "CountryName" },
  ];
  const fetchData = async (arg:any) => {
  console.log(arg);
  setLoading(true);
  //setActiveTab(arg);
  try {
    const payload = {
      viewName: "dbo.Inbox_Tasks(8375)",
      firstRow: 1,
      lastRow: 10,
      sortBy: "DeadlineOrdered",
      sortByDirection: "asc",
      filter: `AND tab <> 'Inbox'`,
      fieldList: "*",
      timeout: 0
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
    fetchData('Trash');
  }, []);

  return (
    <div className="bg-white p-6">
      <Loader isLoad={loading}/>
         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
         <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      {/* <FaHome className="text-blue-600" /> */}
      <span className="font-medium">Inbox</span>

      {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
      {/* <span className="font-medium hover:text-blue-700 cursor-pointer">Inbox</span> */} 
/
      {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
      <span className="text-gray-500 font-medium">&nbsp;All</span>
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
      <TableComponent data={inboxData} columns={columns} height="450px" />
       {inboxData?.length !== 0 &&(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />)}
    </div>
  );
};

export default All;
