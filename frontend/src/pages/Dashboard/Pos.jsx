import React, { useState } from "react";
import { SiBuymeacoffee } from "react-icons/si";
import { FiSettings, FiPrinter } from "react-icons/fi";
import { Link } from "react-router-dom"; // For navigation to transaction history

// ---------------- Menu Items ----------------
const menuItems = [
  // List of available drinks with name, image, and category
  {
    name: "Espresso",
    image:
      "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=200&fit=crop",
    category: "Espresso",
  },
  {
    name: "Cold Brew",
    image:
      "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=300&h=200&fit=crop",
    category: "Espresso",
  },
  {
    name: "Cinnamon Latte",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
    category: "Choco Series",
  },
  {
    name: "Cappuccino",
    image:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=200&fit=crop",
    category: "Shiro Series",
  },
  {
    name: "White Mocha",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop",
    category: "Mocha",
  },
  {
    name: "Hazelnut Latte",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=200&fit=crop",
    category: "Macchiato",
  },
];

// ---------------- Categories for filtering ----------------
const categories = [
  "All",
  "Fruit Tea",
  "Coffee Based",
  "Cream Based",
  "Amerikano",
  "Hot Drink",
  "Non Caffeine",
  "Shiro Series",
  "Choco Series",
];

// ---------------- Drink sizes with prices ----------------
const sizes = [
  { name: "16oz", price: 39 },
  { name: "22oz", price: 49 },
];

function Pos() {
  // ---------------- State Management ----------------
  const [selectedCategory, setSelectedCategory] = useState("All"); // Keeps track of the selected category filter
  const [cart, setCart] = useState([]); // Holds all items added to the order
  const [selectedItems, setSelectedItems] = useState({}); // Tracks selected options (size) per item
  const [discountPercent, setDiscountPercent] = useState(0); // Current discount percentage
  const [paymentMethod, setPaymentMethod] = useState("Cash"); // Selected payment method: Cash or GCash
  const [gcashRef, setGcashRef] = useState(""); // Stores GCash reference number

  // ---------------- Filtering ----------------
  const filteredItems =
    selectedCategory === "All"
      ? menuItems // Show all items if "All" is selected
      : menuItems.filter((item) => item.category === selectedCategory);

  // ---------------- Helper Functions ----------------
  // Update item options (e.g., size selection) for a given menu item
  const updateItemOption = (itemName, option, value) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        [option]: value,
      },
    }));
  };

  // Add item with chosen size to the cart
  const addToCart = (item, size) => {
    const itemWithSize = {
      name: `${item.name} (${size.name})`, // Unique name includes size
      price: size.price,
      quantity: 1,
      image: item.image,
    };

    setCart((prev) => {
      // Check if item already exists in cart
      const existingItem = prev.find(
        (cartItem) => cartItem.name === itemWithSize.name
      );
      if (existingItem) {
        // If yes, increase its quantity
        return prev.map((cartItem) =>
          cartItem.name === itemWithSize.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If no, add as new entry
        return [...prev, itemWithSize];
      }
    });
  };

  // Update item quantity in cart (increment or decrement)
  const updateCartQuantity = (itemName, change) => {
    setCart(
      (prev) =>
        prev
          .map((item) =>
            item.name === itemName
              ? { ...item, quantity: Math.max(0, item.quantity + change) } // Prevent negative quantities
              : item
          )
          .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
  };

  // ---------------- Calculations ----------------
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ); // Total before discount
  const discountValue = (subtotal * discountPercent) / 100; // Discount amount
  const total = subtotal - discountValue; // Final total after discount

  // ---------------- UI ----------------
  return (
    <div className="h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* ---------------- Main Content (Menu Items) ---------------- */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        {/* Category Filter (scrollable row of category buttons) */}
        <div className="flex gap-2 mb-6 overflow-x-auto flex-shrink-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)} // Switch category
              className={`px-2 py-1 rounded-full whitespace-nowrap text-xs sm:text-sm transition ${
                selectedCategory === category
                  ? "bg-black text-white" // Highlight if active
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid (shows filtered items) */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                {/* Item image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />

                {/* Item details */}
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-800 mb-3">
                    {item.name}
                  </h3>

                  {/* Size Options (16oz, 22oz) */}
                  <div className="flex justify-center gap-3">
                    {sizes.map((size) => {
                      const isSelected =
                        selectedItems[item.name]?.size === size.name; // Check if size is selected
                      const iconColor =
                        size.name === "16oz"
                          ? "text-orange-500"
                          : "text-blue-500";
                      return (
                        <button
                          key={size.name}
                          onClick={() => {
                            updateItemOption(item.name, "size", size.name); // Save chosen size
                            addToCart(item, size); // Add to cart
                          }}
                          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 transition"
                        >
                          {/* Coffee cup icon */}
                          <SiBuymeacoffee
                            className={`w-5 h-5 ${iconColor} ${
                              isSelected ? "opacity-100" : "opacity-70"
                            }`}
                          />
                          {/* Size name */}
                          <span className="text-xs font-medium">
                            {size.name}
                          </span>
                          {/* Price */}
                          <span className="text-xs font-bold text-gray-600">
                            ₱{size.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- Order Summary Sidebar ---------------- */}
      <div className="w-full md:w-80 bg-white shadow-lg p-4 md:p-6 flex flex-col">
        {/* Header with order number, settings, and clear button */}
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-lg font-semibold">Order #2156</h2>
          <div className="flex items-center gap-3">
            {/* Settings icon → prompts for discount percentage */}
            <FiSettings
              className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800"
              onClick={() => {
                const value = prompt(
                  "Enter discount percentage (%):",
                  discountPercent
                );
                if (value !== null && !isNaN(value)) {
                  setDiscountPercent(parseFloat(value)); // Save discount
                }
              }}
            />
            {/* Clear all button resets cart */}
            <button
              onClick={() => setCart([])}
              className="text-sm text-gray-500 hover:text-red-500"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Cart Items (list of selected drinks) */}
        <div className="space-y-4 mb-6 flex-1 overflow-y-auto">
          {cart.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="flex-1">
                <h4 className="text-xs font-medium text-gray-800">
                  {item.name}
                </h4>
                <p className="text-xs font-semibold">
                  ₱{item.price.toFixed(0)}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateCartQuantity(item.name, -1)} // Decrease qty
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  −
                </button>
                <span className="w-6 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.name, 1)} // Increase qty
                  className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Transaction History Link */}
        <div className="mb-1 text-left">
          <Link
            to="/transactions"
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            View Transaction History
          </Link>
        </div>

        {/* Order Summary (subtotal, discount, total) */}
        <div className="bg-gray-100 rounded-lg p-4 space-y-2 mb-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₱{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Discount ({discountPercent}%)</span>
            <span>- ₱{discountValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-300">
            <span>Total</span>
            <span>₱{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Payment Method (Cash or GCash toggle) */}
        <div className="mt-1 bg-gray-100 rounded-lg p-4">
          <label className="text-sm font-medium text-gray-700 block mb-3">
            Payment Method
          </label>

          {/* Cash Option */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-700">Cash</span>
            <button
              onClick={() => {
                setPaymentMethod("Cash"); // Select cash
                setGcashRef(""); // Clear GCash ref if switching back
              }}
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                paymentMethod === "Cash" ? "bg-gray-800" : "bg-gray-300"
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  paymentMethod === "Cash" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* GCash Option */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-700">GCash</span>
            <button
              onClick={() => {
                setPaymentMethod("GCash"); // Select GCash
              }}
              className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                paymentMethod === "GCash" ? "bg-gray-800" : "bg-gray-300"
              }`}
            >
              <span
                className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${
                  paymentMethod === "GCash" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Show reference input only when GCash is selected */}
          {paymentMethod === "GCash" && (
            <input
              type="text"
              value={gcashRef}
              onChange={(e) => setGcashRef(e.target.value)} // Save entered ref
              placeholder="Enter GCash Ref #"
              className="mt-2 w-full text-xs text-gray-500 border border-gray-300 rounded px-2 py-1"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-2 flex items-center gap-2">
          <button className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-900 transition">
            Process Transaction
          </button>
          <button className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <FiPrinter className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pos;
