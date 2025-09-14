import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";

const data = [
  {
    id: 1,
    name: "John Doe", // NAME
    itemName: "Milk", // ITEM NAME
    quantity: 42, // QUANTITY
    purpose: "Cafe Supply", // PURPOSE
    destination: "Main Branch", // DESTINATION
    actionType: "Stock In", // ACTION TYPE
    batchNumber: "BN-1001", // BATCH NO.
  },
  {
    id: 2,
    name: "Jane Smith",
    itemName: "Sugar",
    quantity: 5,
    purpose: "Baking",
    destination: "Warehouse A",
    actionType: "Stock In",
    batchNumber: "BN-1002",
  },
  {
    id: 3,
    name: "Michael Lee",
    itemName: "Flour",
    quantity: 0,
    purpose: "Out of Stock",
    destination: "Warehouse B",
    actionType: "Stock Out",
    batchNumber: "BN-1003",
  },
  {
    id: 4,
    name: "Anna Cruz",
    itemName: "Butter",
    quantity: 15,
    purpose: "Inventory Update",
    destination: "Main Branch",
    actionType: "Stock In",
    batchNumber: "BN-1004",
  },
  {
    id: 5,
    name: "Carlos Reyes",
    itemName: "Cheese",
    quantity: 2,
    purpose: "Delivery",
    destination: "Store B",
    actionType: "Stock Out",
    batchNumber: "BN-1005",
  },
  // ... continue mapping the rest following the same structure
];

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
      <div className="flex flex-col gap-6 items-center rounded-lg justify-normal bg-stone-100 p-3 rounded-lg border border-gray-200 h-full">
        <div className="bg-white rounded-lg p-4 w-full">
          {/* Header row with title + buttons */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Add New Log</h3>
            <div className="flex gap-2">
              <button className="px- py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
                Add
              </button>
              <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg shadow hover:bg-gray-400 transition">
                Cancel
              </button>
            </div>
          </div>

          {/* Full width divider */}
          <hr className="my-3 border-t border-gray-300" />

          {/* Responsive form */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Name"
              required
              className="px-3 py-2 bg-gray-200 font-semibold rounded-lg shadow-sm w-full"
            />
            <input
              type="text"
              placeholder="Item Name"
              required
              className="px-3 py-2 bg-gray-200 font-semibold rounded-lg shadow-sm w-full"
            />
            <input
              type="number"
              placeholder="Quantity"
              required
              className="px-3 py-2 bg-gray-200 font-semibold rounded-lg shadow-sm w-full"
            />
            <input
              type="number"
              placeholder="Quantity"
              required
              className="px-3 py-2 bg-gray-200 font-semibold rounded-lg shadow-sm w-full"
            />
            <input
              type="text"
              placeholder="Purpose"
              required
              className="px-3 py-2 bg-gray-200 font-semibold rounded-lg shadow-sm w-full"
            />
            <input
              type="text"
              placeholder="Destination"
              required
              className="px-3 py-2 bg-gray-200 font-semibold rounded-lg shadow-sm w-full"
            />
            <input
              type="text"
              placeholder="Action Type"
              required
              className="px-3 py-2 bg-gray-200 font-semibold rounded-lg shadow-sm w-full"
            />
            <input
              type="text"
              placeholder="Batch No."
              required
              className="px-3 py-2 bg-gray-200 font-semibold rounded-lg shadow-sm w-full"
            />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 h-full w-full">
          <div class="relative overflow-hidden shadow-md rounded-lg">
            <table class="table-auto w-full text-left border-collapse">
              <thead class="uppercase bg-[#8890a0] text-[#e5e7eb]">
                <tr>
                  <th class="py-3 px-4 text-center font-bold">Name</th>
                  <th class="py-3 px-4 text-center font-bold">Item Name</th>
                  <th class="py-3 px-4 text-center font-bold">Quantity</th>
                  <th class="py-3 px-4 text-center font-bold">Purpose</th>
                  <th class="py-3 px-4 text-center font-bold">Destination</th>
                  <th class="py-3 px-4 text-center font-bold">Action Type</th>
                  <th class="py-3 px-4 text-center font-bold">Batch No.</th>
                </tr>
              </thead>
              <tbody class="bg-white text-gray-600">
                <tr class="hover:bg-gray-50">
                  <td class="py-2 px-4 border border-dashed border-gray-300 text-center">
                    YY-853581
                  </td>
                  <td class="py-2 px-4 border border-dashed border-gray-300 text-center">
                    Notebook Basic
                  </td>
                  <td class="py-2 px-4 border border-dashed border-gray-300 text-center">
                    $299
                  </td>
                  <td class="py-2 px-4 border border-dashed border-gray-300 text-center">
                    YY-853599
                  </td>
                  <td class="py-2 px-4 border border-dashed border-gray-300 text-center">
                    Notebook Pro
                  </td>
                  <td class="py-2 px-4 border border-dashed border-gray-300 text-center">
                    $849
                  </td>
                  <td class="py-2 px-4 border border-dashed border-gray-300 text-center">
                    $849
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RequestForm;
