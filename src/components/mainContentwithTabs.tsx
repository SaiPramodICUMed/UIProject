import React from "react";

type Task = {
  id: string;
  Name: string;
  TaskType: string;
  Status: string;
  FAO: string;
  Owner : string;
  Created: string;
  LastModified: string;
  ItemCount: number;
  OriginalValue: string;
  FloorBreaks : number;
  FloorBreaksP : number;
  Due : string;
  CountryName: string;
};

type TableProps = {
  data: Task[];
};

const TableComponent: React.FC<TableProps> = ({ data }) => {

  return (
    <div className="p-4 w-full">
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-full border border-gray-200 text-sm table-fixed">
          <thead className="bg-gray-100">
            <tr>
              
              <th className="p-2 border">Task Name</th>
              <th className="p-2 border">Task Type</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Next</th>
              <th className="p-2 border">Creator</th>
              <th className="p-2 border">Created</th>
              <th className="p-2 border">Last Modified</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Value</th>
              <th className="p-2 border">Floor Breaks</th>
              <th className="p-2 border">Due</th>
              <th className="p-2 border">Country</th>
            </tr>
          </thead>
          <tbody>            
            {data.length > 0 ? (
            data.map((task) => (
              <tr
                key={task.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >               
                <td className="p-2 border">{task.Name}</td>
                <td className="p-2 border">{task.TaskType}</td>
                <td
                  className={`p-2 border font-semibold ${
                    task.Status === "Declined"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {task.Status}
                </td>
                <td className="p-2 border">{task.FAO}</td>
                <td className="p-2 border">{task.Owner}</td>
                <td className="p-2 border">{task.Created}</td>
                <td className="p-2 border">{task.LastModified}</td>
                <td className="p-2 border text-center">{task.ItemCount}</td>
                <td className="p-2 border">{task.OriginalValue}</td>
                <td className="p-2 border">{`${task.FloorBreaks} (${task.FloorBreaksP} %)`}</td>
                <td className="p-2 border">{task.Due}</td>
                <td className="p-2 border">{task.CountryName}</td>
              </tr>
            ))) : (
              <tr>
                <td
                  colSpan={10}
                  className="p-4 text-center text-gray-500 italic"
                >
                  No records to display
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>
          Showing {data.length} of {data.length}
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200">
            Prev
          </button>
          <button className="px-3 py-1 border rounded bg-gray-100 hover:bg-gray-200">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
