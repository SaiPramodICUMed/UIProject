import React, { useState } from "react";

interface Segment {
  id: number;
  name: string;
  type: string;
  country: string;
  reference: string;
}

const EditSegmentation: React.FC = () => {
  const [country, setCountry] = useState("Germany");

  const [segments] = useState<Segment[]>([
    { id: 405, name: "HC/AS -Distributors", type: "Account", country: "Germany", reference: "tier5" },
    { id: 436, name: "HC/AS -Providers", type: "Account", country: "Germany", reference: "tier5" },
    { id: 398, name: "High potential customer", type: "Account", country: "Germany", reference: "tier2" },
    { id: 397, name: "Homecare Dealer / Provider", type: "Group", country: "Germany", reference: "tier5" },
    { id: 400, name: "Hospital Distributors", type: "Account", country: "Germany", reference: "tier3" },
    { id: 394, name: "Large BG", type: "Group", country: "Germany", reference: "tier2" },
    { id: 399, name: "Large Hospitals", type: "Account", country: "Germany", reference: "tier2" },
    { id: 395, name: "Medium BG", type: "Group", country: "Germany", reference: "tier3" },
    { id: 401, name: "Medium Hospitals", type: "Account", country: "Germany", reference: "tier3" },
    { id: 434, name: "Others", type: "Account", country: "Germany", reference: "tier5" },
  ]);

  const handleAction = (action: string) => {
    alert(`${action} button clicked`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Edit Segmentation</h1>
        <button className="text-blue-600 hover:underline text-sm">Back To Segmentation</button>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => handleAction("Rename")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-1 rounded-md"
          >
            Rename
          </button>
          <button
            onClick={() => handleAction("Delete")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={() => handleAction("Activate")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md"
          >
            Activate
          </button>
          <button
            onClick={() => handleAction("Add New")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
          >
            Add New
          </button>
        </div>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 bg-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="Germany">Germany</option>
          <option value="France">France</option>
          <option value="Spain">Spain</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
        <table className="min-w-full border-collapse text-gray-700">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 py-2 border-b text-left font-medium">Segment Id</th>
              <th className="px-4 py-2 border-b text-left font-medium">Segment Name</th>
              <th className="px-4 py-2 border-b text-left font-medium">Segment Type Name</th>
              <th className="px-4 py-2 border-b text-left font-medium">Country Name</th>
              <th className="px-4 py-2 border-b text-left font-medium">Reference</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((seg, i) => (
              <tr
                key={seg.id}
                className={`${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-50 transition`}
              >
                <td className="px-4 py-2 border-b">{seg.id}</td>
                <td className="px-4 py-2 border-b">{seg.name}</td>
                <td className="px-4 py-2 border-b">{seg.type}</td>
                <td className="px-4 py-2 border-b">{seg.country}</td>
                <td className="px-4 py-2 border-b">{seg.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Placeholder */}
        <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-b-lg">
          <span>Displaying items 1 - 10 of 17</span>
          <div className="flex gap-1 text-gray-600">
            <button className="px-2 py-1 border rounded hover:bg-gray-200">⏮</button>
            <button className="px-2 py-1 border rounded bg-blue-100 text-blue-800">1</button>
            <button className="px-2 py-1 border rounded hover:bg-gray-200">2</button>
            <button className="px-2 py-1 border rounded hover:bg-gray-200">⏭</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSegmentation;
