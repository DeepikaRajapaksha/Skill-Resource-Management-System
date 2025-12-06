import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProjectAssignment } from "../../services/ProjectAssignmentAPI";
import { getAllProjects } from "../../services/ProjectAPI";
import { getAllPersonnel } from "../../services/PersonnelAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    project_id: "",
    personnel_id: "",
    role_in_project: "",
  });
  const [projects, setProjects] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pRes = await getAllProjects();
        const perRes = await getAllPersonnel();
        setProjects(pRes.data);
        setPersonnel(perRes.data);
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to fetch projects or personnel.", type: "error" });
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === "project_id") {
      const project = projects.find((p) => p.id.toString() === e.target.value);
      setSelectedProjectDetails(project || null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.project_id || !form.personnel_id) {
      setToast({ message: "Project and Personnel are required.", type: "error" });
      return;
    }

    try {
      await createProjectAssignment(form);
      setToast({ message: "Personnel assigned successfully!", type: "success" });
      setTimeout(() => navigate("/project-assignment"), 1000);
    } catch (err) {
      console.error(err);
      setToast({ message: err.response?.data?.message || "Server error", type: "error" });
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

      <h2 className="personnel-title">Assign Developer to Project</h2>

      <form onSubmit={handleSubmit} className="personnel-form">
        <div className="form-group">
          <label>Project *</label>
          <select
            name="project_id"
            className="form-input"
            value={form.project_id}
            onChange={handleChange}
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {selectedProjectDetails && (
          <div className="project-details">
            <p><strong>Description: </strong> {selectedProjectDetails.description || "N/A"}</p>
            <p><strong>Status: </strong> {selectedProjectDetails.status}</p>
          </div>
        )}

        <div className="form-group">
          <label>Personnel *</label>
          <select
            name="personnel_id"
            className="form-input"
            value={form.personnel_id}
            onChange={handleChange}
          >
            <option value="">Select Personnel</option>
            {personnel.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.role})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Role in Project</label>
          <input
            type="text"
            name="role_in_project"
            className="form-input"
            value={form.role_in_project}
            onChange={handleChange}
            placeholder="Team Lead, Developer…"
          />
        </div>

        <button type="submit" className="btn-submit">
          Assign
        </button>
      </form>
    </div>
  );
}
