import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPersonnel, deletePersonnel } from "../../services/PersonnelAPI";
import Toast from "../../components/Toast"; 
import "../../styles/personnel.css";
import { confirmDelete } from "../../components/confirmDelete";
import Swal from "sweetalert2";

export default function List() {
  const [personnel, setPersonnel] = useState([]);
  const [toast, setToast] = useState(null); 
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
    const result = await confirmDelete({
      title: "Delete Developer?",
      text: "This developer record will be permanently deleted.",
    });

    if (result.isConfirmed) {
      try {
        await deletePersonnel(id);
        Swal.fire("Deleted!", "The developer has been deleted.", "success");
        fetchPersonnel();
      } catch (error) {
        Swal.fire("Error", "Failed to developer the personnel.", "error");
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
        <h2 className="personnel-title">Developer Management</h2>
        <button
          onClick={() => navigate("/personnel/create")}
          className="btn-primary"
        >
          + Add Developer
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
