import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProject, updateProject } from "../../services/ProjectAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  const [toast, setToast] = useState(null);

  // Fetch project by ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await getProject(id);

        setForm({
          name: res.data.name || "",
          description: res.data.description || "",
          start_date: res.data.start_date || "",
          end_date: res.data.end_date || "",
          status: res.data.status || "",
        });
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to fetch project data.", type: "error" });
        setTimeout(() => navigate("/projects"), 2000);
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.start_date || !form.end_date || !form.status) {
      setToast({ message: "Project Name, Dates, and Status are required!", type: "error" });
      return;
    }

    try {
      await updateProject(id, form);
      setToast({ message: "Project updated successfully!", type: "success" });

      setTimeout(() => navigate("/projects"), 1000);
    } catch (err) {
      console.error(err);
      setToast({ message: err.response?.data?.message || "Server error. Please try again.", type: "error" });
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

      <h2 className="personnel-title">Edit Project</h2>

      <form onSubmit={handleUpdate} className="personnel-form">
        <div className="form-group">
          <label>Project Name *</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter project name"
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            className="form-input"
            value={form.description}
            onChange={handleChange}
            placeholder="Enter project description"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Start Date *</label>
          <input
            type="date"
            name="start_date"
            className="form-input"
            value={form.start_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>End Date *</label>
          <input
            type="date"
            name="end_date"
            className="form-input"
            value={form.end_date}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status *</label>
          <select
            name="status"
            className="form-input"
            value={form.status}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option>Planning</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Update Project
        </button>
      </form>
    </div>
  );
}

