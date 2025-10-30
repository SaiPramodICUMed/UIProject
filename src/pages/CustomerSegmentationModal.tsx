import React, { useState } from "react";

interface CustomerSegmentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCustomers: string[];
  onConfirm: (segmentation: string) => void;
}

const CustomerSegmentationModal: React.FC<CustomerSegmentationModalProps> = ({
  isOpen,
  onClose,
  selectedCustomers,
  onConfirm,
}) => {
  const [segmentation, setSegmentation] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!segmentation.trim()) {
      alert("Please select a segmentation option before confirming.");
      return;
    }
    onConfirm(segmentation);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Customer Segmentation
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 text-sm">
          <div>
            <h3 className="font-semibold mb-1 text-gray-700">
              Move Selected Customers
            </h3>
            <div className="border border-gray-200 bg-gray-50 rounded-md p-3 h-24 overflow-y-auto">
              {selectedCustomers.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {selectedCustomers.map((customer, idx) => (
                    <li key={idx}>{customer}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No customers selected</p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <label className="font-medium text-gray-700 sm:w-1/2">
              Please select which segmentation to move customers to:
            </label>
            <select
              value={segmentation}
              onChange={(e) => setSegmentation(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full sm:w-1/2 focus:outline-none focus:ring focus:ring-blue-200"
            >
              <option value="">Select segmentation</option>
              <option value="high potential customer">
                High potential customer
              </option>
              <option value="medium potential customer">
                Medium potential customer
              </option>
              <option value="low potential customer">
                Low potential customer
              </option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleConfirm}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSegmentationModal;

//  const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCustomers, setSelectedCustomers] = useState([
//     "AbbVie GmbH & Co. KG",
//   ]);

//    const handleConfirm = (segmentation: string) => {
//     console.log("Selected segmentation:", segmentation);
//     // handle update logic here
//   };

//   <CustomerSegmentationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         selectedCustomers={selectedCustomers}
//         onConfirm={handleConfirm}
//       />
