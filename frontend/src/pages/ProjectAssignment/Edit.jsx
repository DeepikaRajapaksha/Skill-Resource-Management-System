import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProjectAssignment, updateProjectAssignment } from "../../services/ProjectAssignmentAPI";
import { getAllProjects } from "../../services/ProjectAPI";
import { getAllPersonnel } from "../../services/PersonnelAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    project_id: "",
    personnel_id: "",
    role_in_project: ""
  });
  const [projects, setProjects] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, perRes, assignmentRes] = await Promise.all([
          getAllProjects(),
          getAllPersonnel(),
          getProjectAssignment(id)
        ]);
        setProjects(pRes.data);
        setPersonnel(perRes.data);
        setForm({
          project_id: assignmentRes.data.project_id,
          personnel_id: assignmentRes.data.personnel_id,
          role_in_project: assignmentRes.data.role_in_project || ""
        });
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to fetch data.", type: "error" });
        setTimeout(() => navigate("/project-assignment"), 2000);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.project_id || !form.personnel_id) {
      setToast({ message: "Project and Personnel are required.", type: "error" });
      return;
    }

    try {
      await updateProjectAssignment(id, form);
      setToast({ message: "Project Assignment updated successfully!", type: "success" });
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

      <h2 className="personnel-title">Edit Project Assignment</h2>

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
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

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
              <option key={p.id} value={p.id}>{p.name} ({p.role})</option>
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

        <button type="submit" className="btn-submit">Update Assignment</button>
      </form>
    </div>
  );
}
