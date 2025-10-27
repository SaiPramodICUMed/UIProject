import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../components/loader";
import axios from "axios";


const EditSegmentation: React.FC = () => {
  const user = useSelector((state: any) => state.user.users);
  const [showModal, setShowModal] = useState(false);
  const countries:[] = useSelector((state: any) => state.user.countries);
  const [segmentsData, setSegmentsData] = useState<any>([]);
  const [newSeg, setNewSeg] = useState({ name: "", type: "" });
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(user.activeCountryId);
const navigate = useNavigate();
  // const [segments] = useState<Segment[]>([
  //   { id: 405, name: "HC/AS -Distributors", type: "Account", country: "Germany", reference: "tier5" },
  //   { id: 436, name: "HC/AS -Providers", type: "Account", country: "Germany", reference: "tier5" },
  //   { id: 398, name: "High potential customer", type: "Account", country: "Germany", reference: "tier2" },
  //   { id: 397, name: "Homecare Dealer / Provider", type: "Group", country: "Germany", reference: "tier5" },
  //   { id: 400, name: "Hospital Distributors", type: "Account", country: "Germany", reference: "tier3" },
  //   { id: 394, name: "Large BG", type: "Group", country: "Germany", reference: "tier2" },
  //   { id: 399, name: "Large Hospitals", type: "Account", country: "Germany", reference: "tier2" },
  //   { id: 395, name: "Medium BG", type: "Group", country: "Germany", reference: "tier3" },
  //   { id: 401, name: "Medium Hospitals", type: "Account", country: "Germany", reference: "tier3" },
  //   { id: 434, name: "Others", type: "Account", country: "Germany", reference: "tier5" },
  // ]);

  const handleAction = (action: string) => {
    if (action === "Add New") {
      setShowModal(true);
    } else {
      alert(`${action} button clicked`);
    }
  };

  const handleConfirm = () => {
    alert(`New segmentation added:\nName: ${newSeg.name}\nType: ${newSeg.type}`);
    setNewSeg({ name: "", type: "" });
    setShowModal(false);
  };
  const handleChange = (event:any) => {
    setSelectedValue(event.target.value);
  };

  const isValid = newSeg.name.trim() !== "" && newSeg.type.trim() !== "";

  const fetchAllSegments = async (arg:any) => {
    //console.log(arg);
    setLoading(true);
    //setActiveTab(arg);
    try {
      const payload = {
        countryId: arg,
        deleted: true,
      };

      // 👈 second argument is the body (data)
      const response = await axios.post(
        `https://10.2.6.130:5000/api/Strategy/getAllSegments`,
        payload,
        { headers: { "Content-Type": "application/json" } } // optional config
      );

      console.log("Summary Data:", response.data[0]);
      setSegmentsData(response.data);
      setLoading(false);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
      return null;
    }
  };
  useEffect(() => {
      fetchAllSegments(user.activeCountryId);   
    }, []);

     useEffect(() => {
      fetchAllSegments(selectedValue);  
    }, [selectedValue]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-sm relative">
      <Loader isLoad={loading} />
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Edit Segmentation</h1>
        <button className="text-blue-600 hover:underline text-sm" onClick={() =>navigate("/segmentationAccounts")}>Back To Segmentation</button>
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
          value={selectedValue}
          onChange={handleChange}
          className="w-[200] border border-gray-300 rounded-md px-3 py-0 text-gray-700 bg-white focus:ring-2 focus:ring-gray-200 focus:outline-none"
        >
          {countries.map((option:any) => (
          <option key={option.countryId} value={option.countryId}>
            {option.countryName}
          </option>
        ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg bg-white shadow-sm">
        <table className="min-w-full border-collapse text-gray-700">
          <thead className="bg-[#0f59ac] text-white">
            <tr>
              <th className="px-4 py-2 border-b text-left font-medium">Segment Id</th>
              <th className="px-4 py-2 border-b text-left font-medium">Segment Name</th>
              <th className="px-4 py-2 border-b text-left font-medium">Segment Type Name</th>
              <th className="px-4 py-2 border-b text-left font-medium">Country Name</th>
              <th className="px-4 py-2 border-b text-left font-medium">Reference</th>
            </tr>
          </thead>
          <tbody>
            {segmentsData.map((seg:any, i:number) => (
              <tr
                key={seg.segmentId}
                className={`${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-blue-50 transition`}
              >
                <td className="px-4 py-2 border-b">{seg.segmentId}</td>
                <td className="px-4 py-2 border-b">{seg.segmentName}</td>
                <td className="px-4 py-2 border-b">{seg.segmentTypeName}</td>
                <td className="px-4 py-2 border-b">{seg.countryName}</td>
                <td className="px-4 py-2 border-b">{seg.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Placeholder */}
        {/* <div className="flex justify-between items-center px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-b-lg">
          <span>Displaying items 1 - 10 of 17</span>
          <div className="flex gap-1 text-gray-600">
            <button className="px-2 py-1 border rounded hover:bg-gray-200">⏮</button>
            <button className="px-2 py-1 border rounded bg-blue-100 text-blue-800">1</button>
            <button className="px-2 py-1 border rounded hover:bg-gray-200">2</button>
            <button className="px-2 py-1 border rounded hover:bg-gray-200">⏭</button>
          </div>
        </div> */}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-sm p-5">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Add New Segmentation</h2>
              <button
                className="text-gray-400 hover:text-gray-600 text-xl"
                onClick={() => setShowModal(false)}
              >
                ×
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-700 font-medium">Name:</label>
                <input
                  type="text"
                  value={newSeg.name}
                  onChange={(e) => setNewSeg({ ...newSeg, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter segmentation name"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 font-medium">Type:</label>
                <select
                  value={newSeg.type}
                  onChange={(e) => setNewSeg({ ...newSeg, type: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Type</option>
                  <option value="Account">Account</option>
                  <option value="Group">Group</option>
                </select>
              </div>

              <p className="text-xs text-gray-600">
                <span className="font-semibold text-gray-800">Please note:</span> When a new
                Segmentation is added, PMSI will send you an update to the target tool. Offsets and
                Floors will need to be set for this new segmentation before it can go live.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end mt-5">
              <button
                onClick={handleConfirm}
                disabled={!isValid}
                className={`px-4 py-2 rounded-md text-white ${
                  isValid
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditSegmentation;
