import React, { useState } from "react";

interface CustomerDetails {
  name: string;
  telephone: string;
  email: string;
  address: string;
  reference: string;
}

interface FormData {
  taskName: string;
  taskType: string;
  currency: string;
  segment: string;
  distributor: string;
  validFromType: "immediately" | "date";
  validFrom: string;
  validUntilType: "period" | "date";
  validUntil: string;
  customer: CustomerDetails;
}

const ViewDetails: React.FC = () => {
  const defaultData: FormData = {
    taskName: "P – 050085 – MCKESSON (33)",
    taskType: "Price List",
    currency: "USD",
    segment: "Distributor",
    distributor: "Multiple Distributors",
    validFromType: "immediately",
    validFrom: "2025-01-01",
    validUntilType: "period",
    validUntil: "2025-12-31",
    customer: {
      name: "Camelback Women's Health",
      telephone: "",
      email: "",
      address: "",
      reference: "",
    },
  };

  const [form, setForm] = useState<FormData>(defaultData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: keyof FormData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCustomerChange = (
    field: keyof CustomerDetails,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      customer: { ...prev.customer, [field]: value },
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.taskName) newErrors.taskName = "Task name is required";
    if (!form.currency) newErrors.currency = "Currency is required";
    if (!form.customer.name) newErrors.name = "Customer name is required";
    if (
      form.customer.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customer.email)
    )
      newErrors.email = "Invalid email format";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      console.log("✅ Saved Data:", form);
      alert("Data saved successfully!");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* Task Details Section */}
      <div className="border border-gray-200 rounded-md mx-2 p-4">
        <h2 className="bg-[#0f59ac] text-white font-semibold text-sm px-3 py-2 rounded-t-md mb-4">
          Task Details
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <label className="font-medium">Task Name:</label>
            <input
              value={form.taskName}
              onChange={(e) => handleChange("taskName", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:ring-1 focus:ring-blue-500 outline-none"
            />
            {errors.taskName && (
              <p className="text-red-500 text-xs">{errors.taskName}</p>
            )}
          </div>

          <div>
            <label className="font-medium">Currency:</label>
            <select
              value={form.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
            >
              <option value="">Select</option>
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
            {errors.currency && (
              <p className="text-red-500 text-xs">{errors.currency}</p>
            )}
          </div>

          <div>
            <label className="font-medium">Task Type:</label>
            <select
              value={form.taskType}
              onChange={(e) => handleChange("taskType", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
            >
              <option>Price List</option>
              <option>Discount</option>
            </select>
          </div>

          <div>
            <label className="font-medium">Segment:</label>
            <select
              value={form.segment}
              onChange={(e) => handleChange("segment", e.target.value)}
              className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
            >
              <option>Distributor</option>
              <option>Retailer</option>
            </select>

            {/* Distributor under segment */}
            <div className="mt-3">
              <label className="font-medium">Distributor:</label>
              <div className="flex gap-2 mt-1">
                <input
                  value={form.distributor}
                  onChange={(e) => handleChange("distributor", e.target.value)}
                  className="flex-1 border border-gray-300 rounded-md px-2 py-1"
                />
                <button className="bg-[#0f59ac] hover:bg-[#0d4b93] text-white px-4 py-1.5 rounded-md text-xs font-medium transition-all">
                  Edit Distributors
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Price List + Customer Details Section */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Price List Details */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="bg-[#0f59ac] text-white font-semibold text-sm px-3 py-2 rounded-t-md mb-4">
            Price List Details
          </h2>

          <div className="space-y-4 text-sm mx-2 mt-15 mx-4">
            <div className="space-y-6 text-sm">
              {/* Valid From Row */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                {/* Label on left */}
                <label className="font-medium w-32 shrink-0 pt-1">
                  Valid From:
                </label>

                {/* Input section on right */}
                <div className="flex flex-col w-full sm:w-auto">
                  {/* Radio Buttons Row */}
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="validFromType"
                        checked={form.validFromType === "immediately"}
                        onChange={() =>
                          handleChange("validFromType", "immediately")
                        }
                        className="accent-blue-600"
                      />
                      <span>Immediately</span>
                    </label>

                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="validFromType"
                        checked={form.validFromType === "date"}
                        onChange={() => handleChange("validFromType", "date")}
                        className="accent-blue-600"
                      />
                      <span>Specific Date</span>
                    </label>
                  </div>

                  {/* Date field below with spacing */}
                  <div className="mt-6">
                    <input
                      type="date"
                      value={form.validFrom}
                      onChange={(e) =>
                        handleChange("validFrom", e.target.value)
                      }
                      disabled={form.validFromType !== "date"}
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-64 disabled:bg-gray-100 disabled:text-gray-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Valid Until Row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mt-15">
              {/* Label on left */}
              <label className="font-medium w-24 shrink-0 pt-1">
                Valid Until:
              </label>

              {/* Right side content */}
              <div className="flex flex-col w-full sm:w-auto">
                {/* Radio Buttons Row */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="validUntilType"
                      checked={form.validUntilType === "period"}
                      onChange={() => handleChange("validUntilType", "period")}
                      className="accent-blue-600"
                    />
                    <span>Specific time</span>
                  </label>

                  <label className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="validUntilType"
                      checked={form.validUntilType === "date"}
                      onChange={() => handleChange("validUntilType", "date")}
                      className="accent-blue-600"
                    />
                    <span>Specific Date</span>
                  </label>
                </div>

                {/* Date field below */}
                {form.validUntilType == "date" ? (
                  <div className="mt-6">
                    <input
                      type="date"
                      value={form.validUntil}
                      onChange={(e) =>
                        handleChange("validUntil", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-64"
                    />
                  </div>
                ) : (
                  <div className="mt-6">
                    <select
                      value={form.validUntil}
                      onChange={(e) =>
                        handleChange("validUntil", e.target.value)
                      }
                      className="border border-gray-300 rounded-md px-3 py-1.5 w-full sm:w-64"
                    >
                      <option>1 year</option>
                      <option>2 years</option>
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className="border border-gray-200 rounded-md p-4">
          <h2 className="bg-[#0f59ac] text-white font-semibold text-sm px-3 py-2 rounded-t-md mb-4">
            Customer Details
          </h2>

          <div className="space-y-3 text-sm">
            <div>
              <label className="font-medium">Name:</label>
              <input
                value={form.customer.name}
                onChange={(e) => handleCustomerChange("name", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Telephone:</label>
              <input
                value={form.customer.telephone}
                onChange={(e) =>
                  handleCustomerChange("telephone", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
              />
            </div>

            <div>
              <label className="font-medium">Email:</label>
              <input
                type="email"
                value={form.customer.email}
                onChange={(e) => handleCustomerChange("email", e.target.value)}
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="font-medium">Address:</label>
              <textarea
                value={form.customer.address}
                onChange={(e) =>
                  handleCustomerChange("address", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 resize-none"
              />
            </div>

            <div>
              <label className="font-medium">Reference:</label>
              <input
                value={form.customer.reference}
                onChange={(e) =>
                  handleCustomerChange("reference", e.target.value)
                }
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSave}
          className="bg-[#0f59ac] hover:bg-[#0d4b93] text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ViewDetails;
