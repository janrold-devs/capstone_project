import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const RequestForm = () => {
  // State to hold form input values
  const [formData, setFormData] = useState({
    userName: "",
    itemName: "",
    quantity: "",
    purpose: "",
    destination: "",
    actionType: "",
    batchNumber: "",
  });

  /**
   * Side effect: Automatically generates a mock batch number
   * whenever `itemName` changes.
   *
   * In a real-world scenario, this would likely call an API or database
   * to fetch the batch number based on the selected item or expiration date.
   */
  useEffect(() => {
    if (formData.itemName) {
      // Mock: Generate a fake batch number using timestamp
      const mockBatchNumber = "BN-" + new Date().getTime().toString().slice(-4);
      setFormData((prev) => ({ ...prev, batchNumber: mockBatchNumber }));
    }
  }, [formData.itemName]);

  /**
   * Handles input changes for all form fields.
   * Uses event target's `name` attribute to update the correct field.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles form submission.
   * Prevents page reload and logs the form data to console.
   * In a real application, this is where you'd send data to the backend.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
  };

  return (
    <DashboardLayout activeMenu="Item Tracker">
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-lg p-6">
        {/* Form Header */}
        <h2 className="text-xl font-semibold mb-1">Create New Log</h2>
        <p className="text-sm text-gray-500 mb-6">
          Enter item movement details
        </p>

        {/* Form Starts */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Name Field */}
          <input
            type="text"
            name="userName"
            placeholder="Enter user name"
            value={formData.userName}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-300"
            required
          />

          {/* Item Name Field */}
          <input
            type="text"
            name="itemName"
            placeholder="Enter item name"
            value={formData.itemName}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-300"
            required
          />

          {/* Quantity Field */}
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-300"
            required
          />

          {/* Purpose Field */}
          <input
            type="text"
            name="purpose"
            placeholder="Enter purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-300"
            required
          />

          {/* Destination Field */}
          <input
            type="text"
            name="destination"
            placeholder="Enter destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-300"
            required
          />

          {/* Action Type Dropdown */}
          <select
            name="actionType"
            value={formData.actionType}
            onChange={handleChange}
            className="w-full border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-red-300"
            required
          >
            <option value="">Select action type</option>
            <option value="transfer">Transfer</option>
            <option value="use">Use</option>
          </select>

          {/* Batch Number (Auto-Generated, Read-Only) */}
          <input
            type="text"
            name="batchNumber"
            value={formData.batchNumber}
            readOnly
            placeholder="Batch number will appear here"
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-600"
          />

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            {/* Reset Button - Clears form fields */}
            <button
              type="button"
              className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
              onClick={() =>
                setFormData({
                  userName: "",
                  itemName: "",
                  quantity: "",
                  purpose: "",
                  destination: "",
                  actionType: "",
                  batchNumber: "",
                })
              }
            >
              Cancel
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default RequestForm;
