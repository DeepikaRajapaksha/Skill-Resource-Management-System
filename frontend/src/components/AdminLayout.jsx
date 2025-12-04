import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

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
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        background: "#f4f6fa",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: sidebarOpen ? "240px" : "70px",
          transition: "0.3s",
          background: "#1E1E2D",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          paddingTop: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: sidebarOpen ? "1.4rem" : "0.9rem",
            transition: "0.3s",
          }}
        >
          {sidebarOpen ? "SRMS Admin" : "SR"}
        </h2>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link
            to="/dashboard"
            style={{
              padding: "12px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
              transition: "0.3s",
              textAlign: sidebarOpen ? "left" : "center",
            }}
          >
            📊 {sidebarOpen && "Dashboard"}
          </Link>

          <Link
            to="/personnel"
            style={{
              padding: "12px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
              transition: "0.3s",
              textAlign: sidebarOpen ? "left" : "center",
            }}
          >
            👥 {sidebarOpen && "Personnel"}
          </Link>

          <Link
            to="/skills"
            style={{
              padding: "12px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
              transition: "0.3s",
              textAlign: sidebarOpen ? "left" : "center",
            }}
          >
            👥 {sidebarOpen && "Skills"}
          </Link>

          <Link
            to="/projects"
            style={{
              padding: "12px",
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
              transition: "0.3s",
              textAlign: sidebarOpen ? "left" : "center",
            }}
          >
            📁 {sidebarOpen && "Projects"}
          </Link>
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            marginBottom: "20px",
            background: "#ff4d4f",
            border: "none",
            color: "#fff",
            padding: "12px",
            cursor: "pointer",
            fontSize: "1rem",
            width: "90%",
            alignSelf: "center",
            borderRadius: "6px",
          }}
        >
          🔒 {sidebarOpen && "Logout"}
        </button>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Header */}
        <header
          style={{
            background: "#fff",
            padding: "15px 20px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Sidebar Toggle (Mobile)
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: "#667eea",
              border: "none",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.9rem",
              display: "inline-block",
            }}
          >
            ☰
          </button> */}

          <h2 style={{ margin: 0 , color: "#666" }}>Hello, {user.email.split("@")[0]} 👋</h2>

          <div style={{ color: "#666", fontWeight: "500" }}>{today}</div>
        </header>

        {/* Content */}
        <main
          style={{
            padding: "20px",
            overflowY: "auto",
            height: "100%",
            width: "100%",
            color: "#666",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
