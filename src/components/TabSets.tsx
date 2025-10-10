import React, { useState } from "react";
import TableComponent from "./mainContentwithTabs";
import axios from "axios";

type Tab = {
  id: string;
  label: string;
  count?: number;
};

const tabs: Tab[] = [
  { id: "Inbox", label: "Inbox", count: 0 },
  { id: "Drafts", label: "Drafts", count: 0 },
  { id: "Inprogress", label: "In Progress", count: 550 },
  { id: "AwaitingResults", label: "Awaiting Results", count: 2297 },
  { id: "Completed", label: "Completed" },
  { id: "Cancelled", label: "Cancelled" },
  { id: "Trash", label: "Trash" },
  //{ id: "all", label: "All" },
];

const Tabset: React.FC = () => {
  const [activeTab, setActiveTab] = useState("inprogress");
  const [data, setData] = useState([]);
const fetchData = async (arg:any) => {
  console.log(arg);
  setActiveTab(arg);
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
    setData(response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};



  return (
    <div className="w-full border-b border-gray-200">
      <div
        className="
          flex flex-wrap md:grid md:grid-cols-2 lg:flex
          no-scrollbar
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => fetchData(tab.id)}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium border rounded
              ${
                activeTab === tab.id
                  ? "border-blue-500 bg-blue-50 text-blue-600"
                  : "border-gray-300 text-gray-600 hover:text-blue-500 hover:border-blue-400"
              }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>
      <TableComponent data={data}/>
    </div>
  );
};

export default Tabset;
