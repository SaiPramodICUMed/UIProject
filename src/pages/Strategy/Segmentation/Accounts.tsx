import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/TableComponent";
import Pagination from "../../../components/PageNation";
import axios from "axios";
import Loader from "../../../components/loader";
import { useSelector } from "react-redux";
import SimpleBarChart from "../../../components/BarChart";

const Accounts: React.FC = () => {
  const user = useSelector((state: any) => state.user.users);
  const [inboxData, setInboxData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(user.gridPageSize);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalRecords / user.gridPageSize)
  );
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

  const setPageChange = (pageNumber: any, listPerPage?: any) => {
    const noOfrecordsPerPage = listPerPage ? listPerPage : recordsPerPage;
    setCurrentPage(pageNumber);
    let start = pageNumber == 0 ? 1 : (pageNumber - 1) * noOfrecordsPerPage + 1;
    let end =
      pageNumber == 0 ? user.gridPageSize : pageNumber * noOfrecordsPerPage;
    console.log(start, end);
    fetchData(start, end);
  };

  const changeRecordsPerPage = (recordsPerPage: any) => {
    console.log("on count change", recordsPerPage);
    setRecordsPerPage(recordsPerPage);
    setTotalPages(Math.ceil(totalRecords / recordsPerPage));
    setPageChange(1, recordsPerPage);
  };

  const fetchData = async (start: number, end: number) => {
    //console.log(arg);
    //setActiveTab(arg);
    setLoading(true);
    try {
      const payload = {
        viewName: "vw_AccountSales",
        firstRow: start,
        lastRow: end,
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

  const fetchCount = async () => {
    //console.log(arg);
    setLoading(true);
    //setActiveTab(arg);
    try {
      const payload = {
        viewName: `vw_AccountSales`,
        filter: `AND CountryID = 5`,
      };

      // 👈 second argument is the body (data)
      const response = await axios.post(
        `https://10.2.6.130:5000/api/Metadata/getViewCount`,
        payload,
        { headers: { "Content-Type": "application/json" } } // optional config
      );

      //console.log("All", response.data);
      setTotalRecords(response.data.count);
      setLoading(false);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      return null;
    }
  };

  useEffect(() => {
    fetchCount();
    fetchData(1, user.gridPageSize);
  }, []);
  useEffect(() => {
    setTotalPages(Math.ceil(totalRecords / recordsPerPage));
  }, [recordsPerPage, totalRecords]);

  return (
    <div className="bg-white p-6">
      <Loader isLoad={loading} />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          {/* <FaHome className="text-blue-600" /> */}
          <span className="font-medium">Strategy</span>
          {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
          {/* <span className="font-medium hover:text-blue-700 cursor-pointer">Inbox</span> */}
          /{/* <FaChevronRight className="text-gray-400 text-xs" /> */}
          <span className="text-gray-500 font-medium">
            &nbsp;Segmentation /&nbsp;Accounts
          </span>
        </nav>

        {/* <h2 className="text-xl font-semibold text-blue-700">User Details</h2> */}
      </div>
      <div className="p-6">
        <SimpleBarChart />
      </div>
      {/* Responsive Table inside the same container */}
      <TableComponent
        data={inboxData}
        columns={columns}
        height="450px"
        color="blue"
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

export default Accounts;
