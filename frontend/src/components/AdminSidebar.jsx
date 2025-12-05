import React from "react";
import { Link } from "react-router-dom";
import { 
  FaTachometerAlt,   
  FaUsers,           
  FaClipboardList,   
  FaFileAlt,         
  FaProjectDiagram,  
  FaPuzzlePiece,     
  FaTasks            
} from "react-icons/fa";

export default function AdminSidebar({ sidebarOpen }) {
  return (
    <nav className="admin-nav">
      <Link to="/dashboard" style={{ textAlign: sidebarOpen ? "left" : "center" }}>
        <FaTachometerAlt color="#FF6B6B" size={20} /> {sidebarOpen && "Dashboard"}
      </Link>
      <Link to="/personnel" style={{ textAlign: sidebarOpen ? "left" : "center" }}>
        <FaUsers color="#4ECDC4" size={20} /> {sidebarOpen && "Developers"}
      </Link>
      <Link to="/skills" style={{ textAlign: sidebarOpen ? "left" : "center" }}>
        <FaClipboardList color="#FFD93D" size={20} /> {sidebarOpen && "Skills"}
      </Link>
      <Link to="/personnel-skills" style={{ textAlign: sidebarOpen ? "left" : "center" }}>
        <FaFileAlt color="#6A4C93" size={20} /> {sidebarOpen && "Developers Skills"}
      </Link>
      <Link to="/projects" style={{ textAlign: sidebarOpen ? "left" : "center" }}>
        <FaProjectDiagram color="#FF9F1C" size={20} /> {sidebarOpen && "Projects"}
      </Link>
      <Link to="/project-skill" style={{ textAlign: sidebarOpen ? "left" : "center" }}>
        <FaPuzzlePiece color="#2EC4B6" size={20} /> {sidebarOpen && "Projects Skills"}
      </Link>
      <Link to="/project-assignment" style={{ textAlign: sidebarOpen ? "left" : "center" }}>
        <FaTasks color="#FF4C29" size={20} /> {sidebarOpen && "Projects Assign"}
      </Link>
    </nav>
  );
}

