import React, { useEffect, useState } from "react";
import TableComponent from "../components/TableComponent";
import Pagination from "../components/PageNation";
import axios from "axios";
// import data from "../../data.json";

const Inbox: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [inboxData, setInboxData] = useState([]);
  const totalPages = 10;
  const columns = [   
    { header: "Task Name", accessor: "Name" },
    { header: "Task Type", accessor: "TaskType" },
    { header: "Status", accessor: "TaskStatus" },
    { header: "Next", accessor: "FAO" },
    { header: "Creator", accessor: "Owner" },
    { header: "Created", accessor: "Created" },
    { header: "Last Modified", accessor: "LastModified" },
    { header: "Items", accessor: "ItemCount" },
    { header: "Value", accessor: "OriginalValue" },
    { header: "Floor Breaks", accessor: "FloorBreaks" },
    { header: "Due", accessor: "Due" },
    { header: "Country", accessor: "CountryName" },
  ];

  // {
  //       "TaskId": 138669,
  //       "FAO": "Account Manager",
  //       "Name": "P – 066156 – US MEDICAL SPECIALTIES (7)",
  //       "CustomerSegmentId": 495,
  //       "CustomerSegment_": null,
  //       "Region": null,
  //       "CreatorId": 6580,
  //       "Format": null,
  //       "Status": "Declined",
  //       "Due": "2018-01-23T17:20:12.06",
  //       "Created": "2018-01-23T22:24:51.483",
  //       "TaskStatus": "Inprogress",
  //       "TaskTypeID": 1,
  //       "TaskType": "Price List",
  //       "Deadline": "2018-01-24T22:24:51.743",
  //       "StartDate": "2018-01-23T00:00:00",
  //       "Contact": "",
  //       "ContactNumber": "",
  //       "Address": "",
  //       "Email": "",
  //       "Comments": "",
  //       "Immediately": true,
  //       "ExpiryDate": 365,
  //       "HistoryStartDate": 365,
  //       "HistoryEndDate": 0,
  //       "HistoryMaxPeriod": 2326,
  //       "SendToCustomerDate": null,
  //       "warnedIn24": 0,
  //       "ApprovalID": 608,
  //       "CurrencyCode": "USD",
  //       "LastModified": "2018-01-24T17:34:06.437",
  //       "Assignee": null,
  //       "OriginalCreatorId": 6580,
  //       "NewCustomer": false,
  //       "NewCustomerName": "",
  //       "DataSource": 0,
  //       "AssignedDate": null,
  //       "AssigneeSubmitDate": null,
  //       "Sales": 0,
  //       "Tab": "Inprogress",
  //       "Owner": "Greg Romer - ALT INF - South FL",
  //       "CustomerSegment": "Distributor - Alternate Site",
  //       "FloorBreaks": 0,
  //       "FloorBreaksP": 0.000000,
  //       "Value": 0.000000000000000000,
  //       "OriginalValue": 0.000000,
  //       "ItemCount": 1,
  //       "CommentsCount": null,
  //       "InboxType": 6,
  //       "CountryId": 21,
  //       "CountryName": "USA - Alt. Care",
  //       "DeadlineOrdered": "2018-01-24T22:24:51.743",
  //       "SecondaryDeadline": null,
  //       "ERPLoadStatus": 1,
  //       "RowNum": 1
  //   }

  // const data = Array.from({ length: 20 }, (_, i) => ({
  //   id: i + 1,
  //   name: `User ${i + 1}`,
  //   email: `user${i + 1}@example.com`,
  //   role: i % 2 === 0 ? "Admin" : "Editor",
  //   status: i % 3 === 0 ? "Active" : "Pending",
  // }));

  const fetchData = async (arg:any) => {
  console.log(arg);
  //setActiveTab(arg);
  try {
    const payload = {
      viewName: "dbo.Inbox_Tasks(8375)",
      firstRow: 1,
      lastRow: 10,
      sortBy: "DeadlineOrdered",
      sortByDirection: "asc",
      filter: `AND (  1 <> 1  OR tab = '${arg}' )  AND tab = '${arg}'`,
      fieldList: "*",
      timeout: 0
    };

    // 👈 second argument is the body (data)
    const response = await axios.post(
      `https://localhost:7206/api/Inbox/inbox`,
      payload, 
      { headers: { "Content-Type": "application/json" } } // optional config
    );

    console.log("API Response:", response.data);
    setInboxData(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};

useEffect(() => {
    fetchData('inprogress');
  }, []);

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
      <TableComponent data={inboxData} columns={columns} height="450px" color="red"/>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Inbox;
