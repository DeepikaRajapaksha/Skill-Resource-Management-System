import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import MobileNavbar from "../components/MobileNavbar";
import { FaSignOutAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import "../styles/adminLayout.css";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebar, setMobileSidebar] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || { email: "Admin" };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      Swal.fire("Logged Out!", "You have been logged out.", "success");

      navigate("/");
    }
  };

  return (
    <div className="admin-container">
      {/* MOBILE NAVBAR */}
      <MobileNavbar toggleSidebar={() => setMobileSidebar(!mobileSidebar)} />

      {/* SIDEBAR */}
      <aside
        className={`admin-sidebar ${mobileSidebar ? "sidebar-mobile-open" : ""}`}
        style={{ width: sidebarOpen ? "240px" : "70px" }}
      >
        <h2 className="sidebar-title">{sidebarOpen ? "SRMS Admin" : "SR"}</h2>

        <AdminSidebar sidebarOpen={sidebarOpen} />

        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt size={18} /> Logout
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <div className="admin-main">
        <header className="admin-header">
          <h2>Hello, {user.email.split("@")[0]} 👋</h2>
          <span>{today}</span>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
