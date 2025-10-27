import React, { useState } from "react";

interface Item {
  id: number;
  item: string;
  description: string;
  grossVolume: string;
  grossSales: string;
  grossASP: string;
  itemCost: string;
  gmPercent: string;
  source: string;
  direct: boolean;
}

const PricingView: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      item: "30-5001",
      description: "AERFREE AMS WITH VALVE",
      grossVolume: "",
      grossSales: "$7,200",
      grossASP: "$0.00",
      itemCost: "$27.96",
      gmPercent: "0.0%",
      source: "",
      direct: false,
    },
  ]);

  const handleChange = (id: number, field: keyof Item, value: string | boolean) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAdd = () => {
    const newItem: Item = {
      id: items.length + 1,
      item: "",
      description: "",
      grossVolume: "",
      grossSales: "",
      grossASP: "",
      itemCost: "",
      gmPercent: "",
      source: "",
      direct: false,
    };
    setItems([...items, newItem]);
  };

  const handleDelete = (id: number) => {
    setItems(items.filter((i) => i.id !== id));
  };

  return (
    <div className="w-full mx-auto max-w-*xl p-4 text-sm">
      {/* Top Summary Bar */}
      <div className="flex flex-wrap justify-between bg-[#0f59ac] text-white px-4 py-2 rounded-t-lg">
        <div>Items: {items.length}</div>
        <div>Gross Sales: <span className="font-semibold">$7,200</span></div>
        <div>Discount: <span className="font-semibold">0%</span></div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 bg-gray-100 border border-gray-200 px-4 py-2">
        <button onClick={handleAdd} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">+ Add</button>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">Copy</button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">Export</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-300">
        <table className="min-w-[1000px] w-full border-collapse text-xs">
          <thead className="bg-[#eaf2fa] text-gray-700 sticky top-0 z-10">
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-left w-10">#</th>
              <th className="border border-gray-300 px-2 py-1">Item</th>
              <th className="border border-gray-300 px-2 py-1">Item Description</th>
              <th className="border border-gray-300 px-2 py-1">Gross Volume</th>
              <th className="border border-gray-300 px-2 py-1">Gross Sales</th>
              <th className="border border-gray-300 px-2 py-1">Gross ASP</th>
              <th className="border border-gray-300 px-2 py-1">Item Cost</th>
              <th className="border border-gray-300 px-2 py-1">GM %</th>
              <th className="border border-gray-300 px-2 py-1">Source</th>
              <th className="border border-gray-300 px-2 py-1">Direct?</th>
              <th className="border border-gray-300 px-2 py-1">Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50">
                <td className="border border-gray-300 px-2 py-1 text-center">{item.id}</td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    value={item.item}
                    onChange={(e) => handleChange(item.id, "item", e.target.value)}
                    className="w-full border border-gray-200 rounded px-1 py-0.5"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    value={item.description}
                    onChange={(e) => handleChange(item.id, "description", e.target.value)}
                    className="w-full border border-gray-200 rounded px-1 py-0.5"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    value={item.grossVolume}
                    onChange={(e) => handleChange(item.id, "grossVolume", e.target.value)}
                    className="w-full border border-gray-200 rounded px-1 py-0.5"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1">{item.grossSales}</td>
                <td className="border border-gray-300 px-2 py-1">{item.grossASP}</td>
                <td className="border border-gray-300 px-2 py-1">{item.itemCost}</td>
                <td className="border border-gray-300 px-2 py-1">{item.gmPercent}</td>
                <td className="border border-gray-300 px-2 py-1">
                  <input
                    value={item.source}
                    onChange={(e) => handleChange(item.id, "source", e.target.value)}
                    className="w-full border border-gray-200 rounded px-1 py-0.5"
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <input
                    type="checkbox"
                    checked={item.direct}
                    onChange={(e) => handleChange(item.id, "direct", e.target.checked)}
                  />
                </td>
                <td className="border border-gray-300 px-2 py-1 text-center">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* <div className="flex justify-between items-center bg-gray-100 border border-t-0 border-gray-300 px-4 py-2 rounded-b-lg text-xs">
        <div className="flex items-center gap-2">
          <span>Rows per page:</span>
          <select className="border border-gray-300 rounded px-1 py-0.5">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div>Page 1 of 1</div>
      </div> */}
    </div>
  );
};

export default PricingView;
