import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAssignments, deleteAssignment } from "../../services/AssignmentAPI";
import "../../styles/personnel.css";

export default function List() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const res = await getAllAssignments();
      setAssignments(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch assignments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this assignment?")) return;

    try {
      await deleteAssignment(id);
      fetchAssignments();
    } catch (err) {
      console.error(err);
      alert("Failed to delete assignment.");
    }
  };

  return (
    <div className="personnel-container">
      <div className="personnel-header">
        <h2 className="personnel-title">Personnel Skill Assignments</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/personnel-skills/create")}
        >
          + Assign Skill
        </button>
      </div>

      {loading ? (
        <p>Loading assignments...</p>
      ) : (
        <div className="personnel-table-wrapper">
          <table className="personnel-table">
            <thead>
              <tr>
                <th>Personnel</th>
                <th>Skill</th>
                <th>Proficiency</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignments.length > 0 ? (
                assignments.map((a) => (
                  <tr key={a.id}>
                    <td>{a.personnel?.name || "-"}</td>
                    <td>{a.skill?.name || "-"}</td>
                    <td>{a.proficiency}</td>
                    <td className="personnel-actions">
                      <button
                        className="btn-edit"
                        onClick={() =>
                          navigate(`/personnel-skills/edit/${a.id}`)
                        }
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
                  <td
                    colSpan="4"
                    className="text-center"
                    style={{ color: "#888", padding: "15px" }}
                  >
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
