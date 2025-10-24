import React, { useState } from "react";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMessage, setShowMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setShowMessage("Please fill out all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setShowMessage("New passwords do not match.");
      return;
    }

    // Example: Replace with real API call
    console.log("Password reset payload:", {
      
      newPassword,
    });

    setShowMessage(" Password updated successfully!");
   
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="flex justify-center items-center py-15 bg-gray-100">
     <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200 min-h-[400px]">

        <h2 className="text-2xl font-semibold text-center text-blue-900 mb-6 ">
          Reset Password
        </h2>

        {showMessage && (
          <p
            className={`text-sm mb-4 text-center ${
              showMessage.includes("✅")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {showMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0f59ac] text-white py-2 rounded-lg hover:bg-blue-800 transition mt-6"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
