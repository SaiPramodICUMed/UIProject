import React, { useState } from "react";

interface PromoItemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromoItemModal: React.FC<PromoItemModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    numerator: 1,
    denominator: 1,
    ratio: "",
    hasPromoVolume: false,
    allowCustomVolume: false,
    isPriceEditable: false,
    valueType: "Fixed",
    promoLimits: ["0", "0", "0", "0"],
    segments: [] as string[],
    validUntilType: "1year",
    validUntil: "",
  });

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handlePromoLimitChange = (index: number, value: string) => {
    const newLimits = [...formData.promoLimits];
    newLimits[index] = value;
    handleChange("promoLimits", newLimits);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 border-b text-[#0f59ac] px-6 py-3 flex justify-between items-center z-10">
          <h2 className="text-lg font-semibold">Create New Promo Item</h2>
          <button
            onClick={onClose}
            className="bg-white/20 hover:bg-white/30 text-gray-800 px-3 py-1 rounded-lg text-sm"
          >
            X
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-8 slim-scrollbar">

          {/* PROMO DETAILS */}
          <section className="space-y-4 border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-[#0f59ac] text-white px-4 py-2 font-semibold">
              Promo Details
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
          </section>

          {/* OPTIONS */}
          <section className="space-y-4 border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-[#0f59ac] text-white px-4 py-2 font-semibold">
              Options
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Numerator</label>
                <input
                  type="number"
                  value={formData.numerator}
                  onChange={(e) => handleChange("numerator", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Denominator</label>
                <input
                  type="number"
                  value={formData.denominator}
                  onChange={(e) => handleChange("denominator", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Ratio</label>
                <input
                  type="text"
                  value={formData.ratio}
                  onChange={(e) => handleChange("ratio", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
            </div>
            <div className="p-4 flex flex-wrap gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.hasPromoVolume}
                  onChange={(e) => handleChange("hasPromoVolume", e.target.checked)}
                />
                Has Promo Volume
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.allowCustomVolume}
                  onChange={(e) => handleChange("allowCustomVolume", e.target.checked)}
                />
                Allow Custom Volume
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.isPriceEditable}
                  onChange={(e) => handleChange("isPriceEditable", e.target.checked)}
                />
                Is Price Editable
              </label>
            </div>
          </section>

          {/* LIMITS */}
          <section className="space-y-4 border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-[#0f59ac] text-white px-4 py-2 font-semibold">
              Limits
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Value Type</label>
                <select
                  value={formData.valueType}
                  onChange={(e) => handleChange("valueType", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="Fixed">Fixed</option>
                  <option value="Percent">Percent</option>
                </select>
              </div>
              {formData.promoLimits.map((limit, i) => (
                <div key={i}>
                  <label className="text-sm font-medium text-gray-700">
                    PromoLimit{i + 1}
                  </label>
                  <input
                    type="number"
                    value={limit}
                    onChange={(e) => handlePromoLimitChange(i, e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ITEMS */}
          <section className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-[#0f59ac] text-white px-4 py-2 font-semibold">
              Items
            </div>
            <div className="p-4">
              <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm">
                Add Items
              </button>
            </div>
          </section>

          {/* SEGMENTS */}
          <section className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-[#0f59ac] text-white px-4 py-2 font-semibold">
              Segments
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {[
                "HCAIS - Distributors",
                "HCAIS - Providers",
                "High potential customer",
                "Homecare Dealer / Provider",
                "Hospital Distributors",
                "Large BG",
                "Medium BG",
                "Small BG",
                "Pharmacy",
                "Private Hospital",
                "XL Hospitals",
              ].map((seg) => (
                <label key={seg} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.segments.includes(seg)}
                    onChange={(e) =>
                      handleChange(
                        "segments",
                        e.target.checked
                          ? [...formData.segments, seg]
                          : formData.segments.filter((s) => s !== seg)
                      )
                    }
                  />
                  {seg}
                </label>
              ))}
            </div>
          </section>

          {/* PRICELISTS */}
          <section className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-[#0f59ac] text-white px-4 py-2 font-semibold">
              Price Lists
            </div>
            <div className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <label className="font-medium w-32 shrink-0">Valid Until:</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="validUntilType"
                    checked={formData.validUntilType === "1year"}
                    onChange={() => handleChange("validUntilType", "1year")}
                  />
                  <span>1 year</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="validUntilType"
                    checked={formData.validUntilType === "date"}
                    onChange={() => handleChange("validUntilType", "date")}
                  />
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => handleChange("validUntil", e.target.value)}
                    disabled={formData.validUntilType !== "date"}
                    className="border border-gray-300 rounded-md px-2 py-1"
                  />
                </label>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end gap-3 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#0f59ac] text-white hover:bg-[#0d4d99]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoItemModal;
