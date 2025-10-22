import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/TableComponent";
import Pagination from "../../../components/PageNation";
import axios from "axios";
import Loader from "../../../components/loader";
import { useSelector } from "react-redux";

const CompletedTasks: React.FC = () => {
  const user = useSelector((state: any) => state.user.users);
  const [inboxData, setInboxData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(user.gridPageSize);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalRecords / user.gridPageSize));

  const columns = [
    { header: "Task Id", accessor: "TaskId" },
    { header: "Task Type", accessor: "TaskTypeName" },
    { header: "PL Name", accessor: "Name" },
    { header: "PL Desc", accessor: "Description" },
    { header: "PL Comment", accessor: "Comments" },
    { header: "New PL Start Date", accessor: "StartDate" },
    { header: "# Items", accessor: "ItemCount" },
    { header: "Qualifiers", accessor: "Active" },
    { header: "Status", accessor: "LoadStatus" },
    //{ header: "Action", accessor: "YRSalesTracing" },
  ];

  const setPageChange = (pageNumber: any, listPerPage?: any) => {
    const noOfrecordsPerPage = listPerPage ? listPerPage : recordsPerPage
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
    setTotalPages(Math.ceil(totalRecords / recordsPerPage))
    setPageChange(1, recordsPerPage);
  };

  const fetchData = async (start: number, end: number) => {
    //console.log(arg);
    setLoading(true);
    //setActiveTab(arg);
    try {
      const payload = {
        viewName: `dbo.GetLoadTasks(${user.userId}, 1)`,
        firstRow: start,
        lastRow: end,
        sortBy: "TaskId",
        sortByDirection: "asc",
        filter: ``,
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

  const fetchCount = async () => {
    //console.log(arg);
    setLoading(true);
    //setActiveTab(arg);
    try {
      const payload = {
        viewName: `dbo.GetLoadTasks(${user.userId}, 1)`,
        filter: ``
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
    setTotalPages(Math.ceil(totalRecords / recordsPerPage))
  }, [recordsPerPage, totalRecords]);

  return (
    <div className="bg-white p-6">
      <Loader isLoad={loading} />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          {/* <FaHome className="text-blue-600" /> */}
          <span className="font-medium">Pricing</span>

          {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
          {/* <span className="font-medium hover:text-blue-700 cursor-pointer">Inbox</span> */}
          /
          {/* <FaChevronRight className="text-gray-400 text-xs" /> */}
          <span className="text-gray-500 font-medium">&nbsp;ERP Load /&nbsp;Completed Tasks</span>
        </nav>

        {/* <h2 className="text-xl font-semibold text-blue-700">User Details</h2> */}


      </div>
      {/* Responsive Table inside the same container */}
      <TableComponent data={inboxData} columns={columns} height="450px" />
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

export default CompletedTasks;
