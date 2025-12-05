import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPersonnel, deletePersonnel } from "../../services/PersonnelAPI";
import Toast from "../../components/Toast"; // Import the toast component
import "../../styles/personnel.css";

export default function List() {
  const [personnel, setPersonnel] = useState([]);
  const [toast, setToast] = useState(null); // Toast state
  const navigate = useNavigate();

  // Fetch personnel from backend
  const fetchPersonnel = async () => {
    try {
      const res = await getAllPersonnel();
      setPersonnel(res.data);
    } catch (err) {
      console.error("Failed to fetch personnel:", err);
      setToast({ message: "Failed to fetch personnel data.", type: "error" });
    }
  };

  useEffect(() => {
    fetchPersonnel();
  }, []);

  // Delete personnel
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this personnel?")) {
      try {
        await deletePersonnel(id);
        setToast({ message: "Personnel deleted successfully!", type: "success" });
        fetchPersonnel(); 
      } catch (err) {
        console.error("Failed to delete personnel:", err);
        setToast({ message: "Failed to delete personnel.", type: "error" });
      }
    }
  };

  return (
    <div className="personnel-container">
      {/* Toast notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Header */}
      <div className="personnel-header">
        <h2 className="personnel-title">Personnel Management</h2>
        <button
          onClick={() => navigate("/personnel/create")}
          className="btn-primary"
        >
          + Add Personnel
        </button>
      </div>

      {/* Table */}
      <div className="personnel-table-wrapper">
        <table className="personnel-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role / Title</th>
              <th>Experience Level</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {personnel.length > 0 ? (
              personnel.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.role}</td>
                  <td>{p.level}</td>
                  <td>{new Date(p.created_at || p.createdAt).toLocaleDateString()}</td>
                  <td className="personnel-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/personnel/edit/${p.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(p.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No personnel found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
