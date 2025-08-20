import React, { useState } from "react";
import { SiBuymeacoffee } from "react-icons/si";
import { FiSettings, FiPrinter, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

// ---------------- Menu Items ----------------
// Each menu item has: name, image, category
const menuItems = [
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

// ---------------- Add-ons ----------------
const addOns = [
  { name: "Extra Tapioca", price: 10 },
  { name: "Crystal Cookies", price: 8 },
];

function Pos() {
  // ---------------- State Management ----------------
  const [selectedCategory, setSelectedCategory] = useState("All"); // current category filter
  const [cart, setCart] = useState([]); // items in cart
  const [selectedItems, setSelectedItems] = useState({}); // track selected options
  const [discountPercent, setDiscountPercent] = useState(0); // discount %
  const [currentScreen, setCurrentScreen] = useState("order"); // screen toggle: "order" | "payment"
  const [paymentMethod, setPaymentMethod] = useState("Cash"); // "Cash" or "GCash"
  const [gcashRef, setGcashRef] = useState(""); // GCash reference number
  const [cashReceived, setCashReceived] = useState(""); // amount received for cash payments
  const [showAddOnModal, setShowAddOnModal] = useState(false); // modal for add-ons
  const [selectedCartIndex, setSelectedCartIndex] = useState(null); // which cart item add-ons belong to

  // ---------------- Filtering ----------------
  // Show either all items or filter by category
  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  // ---------------- Helper Functions ----------------

  // Save selected options (e.g. size)
  const updateItemOption = (itemName, option, value) => {
    setSelectedItems((prev) => ({
      ...prev,
      [itemName]: {
        ...prev[itemName],
        [option]: value,
      },
    }));
  };

  // Add item (with size) to cart
  const addToCart = (item, size) => {
    const itemWithSize = {
      name: `${item.name} (${size.name})`,
      originalName: item.name,
      price: size.price,
      quantity: 1,
      image: item.image,
      addOns: [],
    };

    setCart((prev) => {
      // If same item already exists without add-ons → increase quantity
      const existingItem = prev.find(
        (cartItem) =>
          cartItem.name === itemWithSize.name && cartItem.addOns.length === 0
      );
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.name === itemWithSize.name && cartItem.addOns.length === 0
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Otherwise, add new cart entry
        return [...prev, itemWithSize];
      }
    });
  };

  // Increase/decrease quantity of a cart item
  const updateCartQuantity = (index, change) => {
    setCart(
      (prev) =>
        prev
          .map((item, i) =>
            i === index
              ? { ...item, quantity: Math.max(0, item.quantity + change) }
              : item
          )
          .filter((item) => item.quantity > 0) // remove if quantity 0
    );
  };

  // Add add-on to a cart item
  const addAddOnToCart = (cartIndex, addOn) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === cartIndex ? { ...item, addOns: [...item.addOns, addOn] } : item
      )
    );
  };

  // Remove add-on from a cart item
  const removeAddOnFromCart = (cartIndex, addOnIndex) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === cartIndex
          ? {
              ...item,
              addOns: item.addOns.filter((_, idx) => idx !== addOnIndex),
            }
          : item
      )
    );
  };

  // ---------------- Calculations ----------------
  // Subtotal = item price * qty + add-ons * qty
  const subtotal = cart.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    const addOnsTotal =
      item.addOns.reduce((addOnSum, addOn) => addOnSum + addOn.price, 0) *
      item.quantity;
    return sum + itemTotal + addOnsTotal;
  }, 0);

  const discountValue = (subtotal * discountPercent) / 100; // discount amount
  const total = subtotal - discountValue; // final total
  const change = cashReceived
    ? Math.max(0, parseFloat(cashReceived) - total)
    : 0; // change for cash payments

  // Reset cart and simulate saving transaction
  const completeTransaction = () => {
    alert("Transaction completed successfully!");
    setCart([]);
    setCurrentScreen("order");
    setCashReceived("");
    setGcashRef("");
    setDiscountPercent(0);
  };

  // Simulate printing receipt
  const printReceipt = () => {
    alert("Receipt printed!");
  };

  // ---------------- UI ----------------
  return (
    <div className="h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* ---------------- Menu Area ---------------- */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        {/* Category Filter Buttons */}
        <div className="flex gap-2 mb-6 overflow-x-auto flex-shrink-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-2 py-1 rounded-full whitespace-nowrap text-xs sm:text-sm transition ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm text-gray-800 mb-3">
                    {item.name}
                  </h3>

                  {/* Size Selection (adds to cart) */}
                  <div className="flex justify-center gap-3">
                    {sizes.map((size) => {
                      const isSelected =
                        selectedItems[item.name]?.size === size.name;
                      const iconColor =
                        size.name === "16oz"
                          ? "text-orange-500"
                          : "text-blue-500";
                      return (
                        <button
                          key={size.name}
                          onClick={() => {
                            updateItemOption(item.name, "size", size.name);
                            addToCart(item, size);
                          }}
                          className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 transition"
                        >
                          <SiBuymeacoffee
                            className={`w-5 h-5 ${iconColor} ${
                              isSelected ? "opacity-100" : "opacity-70"
                            }`}
                          />
                          <span className="text-xs font-medium">
                            {size.name}
                          </span>
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

      {/* ---------------- Sidebar: Order Summary / Payment ---------------- */}
      <div className="w-full md:w-80 bg-white shadow-lg p-4 md:p-6 flex flex-col">
        {currentScreen === "order" ? (
          <>
            {/* ---------------- Order Screen ---------------- */}
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-lg font-semibold">Order #2156</h2>
              <div className="flex items-center gap-3">
                {/* Discount input */}
                <FiSettings
                  className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800"
                  onClick={() => {
                    const value = prompt(
                      "Enter discount percentage (%):",
                      discountPercent
                    );
                    if (value !== null && !isNaN(value)) {
                      setDiscountPercent(parseFloat(value));
                    }
                  }}
                />
                {/* Clear all items */}
                <button
                  onClick={() => setCart([])}
                  className="text-sm text-gray-500 hover:text-red-500"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6 flex-1 overflow-y-auto">
              {cart.map((item, index) => (
                <div key={index} className="border-b pb-3">
                  <div className="flex items-center gap-3 mb-2">
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
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(index, -1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      >
                        −
                      </button>
                      <span className="w-6 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(index, 1)}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Show add-ons if item has them */}
                  {item.addOns.length > 0 && (
                    <div className="ml-13 mb-2">
                      {item.addOns.map((addOn, addOnIndex) => (
                        <div
                          key={addOnIndex}
                          className="flex justify-between items-center text-xs text-gray-600"
                        >
                          <span>+ {addOn.name}</span>
                          <div className="flex items-center gap-2">
                            <span>₱{addOn.price}</span>
                            <button
                              onClick={() =>
                                removeAddOnFromCart(index, addOnIndex)
                              }
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Button to add more add-ons */}
                  <button
                    onClick={() => {
                      setSelectedCartIndex(index);
                      setShowAddOnModal(true);
                    }}
                    className="ml-13 text-xs text-blue-600 hover:text-blue-800"
                  >
                    + Add-ons
                  </button>
                </div>
              ))}
            </div>

            {/* Transaction history link */}
            <div className="mb-4 text-left">
              <Link
                to="/dashboard/transactions"
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                View Transaction History
              </Link>
            </div>

            {/* Order Summary totals */}
            <div className="bg-gray-100 rounded-lg p-4 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount ({discountPercent}%)</span>
                <span>-₱{discountValue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-300">
                <span>Total</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Proceed to Payment */}
            <button
              onClick={() => setCurrentScreen("payment")}
              disabled={cart.length === 0}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Proceed to Payment
            </button>
          </>
        ) : (
          <>
            {/* ---------------- Payment Screen ---------------- */}
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={() => setCurrentScreen("order")}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <FiArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold">Payment</h2>
            </div>

            {/* Receipt-style order summary */}
            <div className="bg-gray-100 rounded-lg p-4 mb-6 text-sm">
              <h3 className="font-semibold mb-2">Order Summary</h3>
              <div className="space-y-2">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="border-b border-dashed border-gray-300 pb-2"
                  >
                    <div className="flex justify-between">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>₱{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    {/* Show add-ons */}
                    {item.addOns.length > 0 && (
                      <div className="ml-4 text-xs text-gray-600">
                        {item.addOns.map((addOn, idx) => (
                          <div key={idx} className="flex justify-between">
                            <span>+ {addOn.name}</span>
                            <span>
                              ₱{(addOn.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-4 pt-2 border-t border-gray-400 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Subtotal</span>
                  <span>₱{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-₱{discountValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2">
                  <span>Total</span>
                  <span>₱{total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment method selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Payment Method
              </h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setPaymentMethod("Cash")}
                  className={`flex-1 py-3 px-4 rounded-lg border transition ${
                    paymentMethod === "Cash"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  Cash
                </button>
                <button
                  onClick={() => setPaymentMethod("GCash")}
                  className={`flex-1 py-3 px-4 rounded-lg border transition ${
                    paymentMethod === "GCash"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  GCash
                </button>
              </div>
            </div>

            {/* Payment details input */}
            {paymentMethod === "Cash" ? (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount Received
                </label>
                <input
                  type="number"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  placeholder="Enter amount received"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
                {/* Display change if entered */}
                {cashReceived && (
                  <div className="mt-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex justify-between text-sm">
                      <span>Change:</span>
                      <span className="font-semibold">
                        ₱{change.toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GCash Reference Number
                </label>
                <input
                  type="text"
                  value={gcashRef}
                  onChange={(e) => setGcashRef(e.target.value)}
                  placeholder="Enter GCash reference number"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            )}

            {/* Complete & Print buttons */}
            <div className="flex gap-3">
              <button
                onClick={completeTransaction}
                disabled={
                  (paymentMethod === "Cash" &&
                    (!cashReceived || parseFloat(cashReceived) < total)) ||
                  (paymentMethod === "GCash" && !gcashRef.trim())
                }
                className="flex-1 bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete Transaction
              </button>
              <button
                onClick={printReceipt}
                className="p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                <FiPrinter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </>
        )}
      </div>

      {/* ---------------- Add-on Modal ---------------- */}
      {showAddOnModal && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAddOnModal(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 w-80 max-w-sm relative">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Select Add-ons
            </h3>

            {/* List of add-ons to choose */}
            <div className="space-y-2 mb-4">
              {addOns.map((addOn, index) => (
                <button
                  key={index}
                  onClick={() => {
                    addAddOnToCart(selectedCartIndex, addOn);
                    setShowAddOnModal(false);
                  }}
                  className="w-full flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-red-50 transition-all duration-200 hover:border-red-300"
                >
                  <span className="text-sm font-medium">{addOn.name}</span>
                  <span className="text-sm font-semibold text-gray-600">
                    ₱{addOn.price}
                  </span>
                </button>
              ))}
            </div>

            {/* Cancel button */}
            <button
              onClick={() => setShowAddOnModal(false)}
              className="w-full py-2.5 text-gray-500 hover:text-gray-700 font-medium rounded-lg border border-gray-300 mt-2 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pos;
