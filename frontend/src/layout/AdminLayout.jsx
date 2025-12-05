// src/layout/AdminLayout.jsx
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import { FaSignOutAlt } from "react-icons/fa";
import "../styles/adminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const user = JSON.parse(localStorage.getItem("user")) || { email: "Admin" };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar" style={{ width: sidebarOpen ? "240px" : "70px" }}>
        <h2 style={{ fontSize: sidebarOpen ? "1.4rem" : "0.9rem" }}>
          {sidebarOpen ? "SRMS Admin" : "SR"}
        </h2>

        {/* Admin Sidebar Navigation */}
        <AdminSidebar sidebarOpen={sidebarOpen} />

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-header">
          <h2 style={{ margin: 0, color: "#666" }}>
            Hello, {user.email.split("@")[0]} 👋
          </h2>
          <div style={{ color: "#666", fontWeight: "500" }}>{today}</div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

