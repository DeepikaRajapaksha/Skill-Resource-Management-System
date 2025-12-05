import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../services/ProjectAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function CreateProject() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
  });

  const [toast, setToast] = useState(null);

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.start_date || !form.end_date || !form.status) {
      setToast({ message: "Project Name, Dates, and Status are required!", type: "error" });
      return;
    }

    try {
      await createProject(form);
      setToast({ message: "Project created successfully!", type: "success" });
      
      setTimeout(() => navigate("/projects"), 1000);
    } catch (err) {
      console.error(err);
      setToast({ message: err.response?.data?.message || "Server error. Please try again.", type: "error" });
    }
  };

  return (
    <div className="personnel-container">
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="personnel-title">Add Project</h2>

      <form onSubmit={handleSubmit} className="personnel-form">
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
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Save Project
        </button>
      </form>
    </div>
  );
}
