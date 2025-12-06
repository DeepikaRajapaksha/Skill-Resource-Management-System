import React from "react";
import { FaBars } from "react-icons/fa";

export default function MobileNavbar({ toggleSidebar }) {
  return (
    <div className="mobile-navbar">
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <FaBars size={22} />
      </button>

      <h3 className="mobile-brand">SRMS Admin</h3>
    </div>
  );
}
