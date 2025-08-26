import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Home from "./pages/Dashboard/Home";
import Ingredients from "./pages/Dashboard/Ingredients";
import Logs from "./pages/Dashboard/Logs";
import Products from "./pages/Dashboard/Products";
import Reports from "./pages/Dashboard/Reports";
import Spoilage from "./pages/Dashboard/Spoilage";
import Stocks from "./pages/Dashboard/Stocks";
import Pos from "./pages/Dashboard/Pos";
import Users from "./pages/Dashboard/Users";
import TransactionHistoryReport from "./pages/Dashboard/TransactionHistory";
import ItemTracker from "./pages/Dashboard/ItemTracker";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/dashboard/ingredients" element={<Ingredients />} />
          <Route path="/dashboard/tracker" element={<ItemTracker />} />
          <Route path="/dashboard/logs" element={<Logs />} />
          <Route path="/dashboard/pos" element={<Pos />} />
          <Route
            path="/dashboard/transactions"
            element={<TransactionHistoryReport />}
          />
          <Route path="/dashboard/products" element={<Products />} />
          <Route path="/dashboard/sales" element={<Reports />} />
          <Route path="/dashboard/spoilage" element={<Spoilage />} />
          <Route path="/dashboard/stocks" element={<Stocks />} />
          <Route path="/dashboard/users" element={<Users />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

const Root = () => {
  //checks if the token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");
  // redirects to dashboard if authenticated, if not it directs to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
