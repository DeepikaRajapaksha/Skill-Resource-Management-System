import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjectAssignments, deleteProjectAssignment } from "../../services/ProjectAssignmentAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function List() {
  const [assignments, setAssignments] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      const res = await getAllProjectAssignments();
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to fetch assignments.", type: "error" });
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;

    try {
      await deleteProjectAssignment(id);
      setToast({ message: "Assignment deleted successfully.", type: "success" });
      fetchAssignments();
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to delete assignment.", type: "error" });
    }
  };

  return (
    <div className="personnel-container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="personnel-header">
        <h2 className="personnel-title">Project Assignments</h2>
        <button
          onClick={() => navigate("/project-assignment/create")}
          className="btn-primary"
        >
          + Add Assignment
        </button>
      </div>

      <div className="personnel-table-wrapper">
        <table className="personnel-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Personnel</th>
              <th>Role in Project</th>
              <th>Assigned At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length > 0 ? (
              assignments.map((a) => (
                <tr key={a.id}>
                  <td>{a.Project?.name || "-"}</td>
                  <td>{a.Personnel?.name || "-"} ({a.Personnel?.role || "-"})</td>
                  <td>{a.role_in_project || "-"}</td>
                  <td>{new Date(a.assigned_at).toLocaleDateString()}</td>
                  <td className="personnel-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/project-assignment/edit/${a.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(a.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No assignments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
