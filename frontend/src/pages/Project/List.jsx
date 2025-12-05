import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects, deleteProject } from "../../services/ProjectAPI";
import "../../styles/personnel.css"; // reuse same styling

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await getAllProjects();
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects:", err);
      alert("Failed to fetch project data. Please try again.");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Delete project
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (err) {
        console.error("Failed to delete project:", err);
        alert("Failed to delete project. Please try again.");
      }
    }
  };

  return (
    <div className="personnel-container">
      {/* Header */}
      <div className="personnel-header">
        <h2 className="personnel-title">Project Management</h2>
        <button
          onClick={() => navigate("/projects/create")}
          className="btn-primary"
        >
          + Add Project
        </button>
      </div>

      {/* Table */}
      <div className="personnel-table-wrapper">
        <table className="personnel-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.length > 0 ? (
              projects.map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.status}</td>
                  <td>{new Date(p.start_date).toLocaleDateString()}</td>
                  <td>{new Date(p.end_date).toLocaleDateString()}</td>
                  <td>
                    {new Date(p.created_at || p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="personnel-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/projects/edit/${p.id}`)}
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
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
