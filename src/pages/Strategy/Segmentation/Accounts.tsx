import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/TableComponent";
import Pagination from "../../../components/PageNation";
import axios from "axios";
import Loader from "../../../components/loader";
//import data from "../../data.json";

const Accounts: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [inboxData, setInboxData] = useState([]);
  const [loading,setLoading]=useState(false);
  const totalPages = 10;
  const columns = [
    { header: "Customer Name", accessor: "CustomerName" },
    { header: "Customer Segment", accessor: "Segment" },
    { header: "Customer Number", accessor: "CustomerNumber" },
    { header: "Party Number", accessor: "PartyNumber" },
    { header: "City", accessor: "City" },
    { header: "Cus Type", accessor: "Type" },
    { header: "Cus Sub Type", accessor: "SubType" },
    { header: "Gross Sales", accessor: "GrossSales" },
    { header: "Gross Margin", accessor: "GM" },
    { header: "GM %", accessor: "GMPerc" },
    { header: "Items Sold", accessor: "ItemsSold" },
  ];

  const fetchData = async () => {
    //console.log(arg);
    //setActiveTab(arg);
    setLoading(true);
    try {
      const payload = {
        viewName: "vw_AccountSales",
        firstRow: 1,
        lastRow: 10,
        sortBy: "CustomerName",
        sortByDirection: "asc",
        filter: `AND CountryID = 5`,
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
    fetchData();
  }, []);

  return (
    <div className="bg-white p-6">
      <Loader isLoad={loading}/>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          {/* <FaHome className="text-blue-600" /> */}
          <span className="font-medium">
            Strategy
          </span>
          {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
          {/* <span className="font-medium hover:text-blue-700 cursor-pointer">Inbox</span> */}
          /{/* <FaChevronRight className="text-gray-400 text-xs" /> */}
          <span className="text-gray-500 font-medium">Segmentation /Accounts</span>
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
      <TableComponent
        data={inboxData}
        columns={columns}
        height="450px"
        color="blue"
      />
      {inboxData?.length !== 0 &&(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />)}
    </div>
  );
};

export default Accounts;
