import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPersonnel } from "../../services/PersonnelAPI";
import "../../styles/personnel.css";

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    level: "",
  });
  const [error, setError] = useState("");

  // Handle input changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!form.name || !form.email || !form.level) {
      setError("Name, Email, and Experience Level are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError("Invalid email format.");
      return;
    }

    try {
      await createPersonnel(form);

      navigate("/personnel");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <div className="personnel-container">
      <h2 className="personnel-title">Add Personnel</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit} className="personnel-form">
        <div className="form-group">
          <label>Name *</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter full name"
          />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            name="email"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            placeholder="example@mail.com"
          />
        </div>

        <div className="form-group">
          <label>Role / Title</label>
          <input
            type="text"
            name="role"
            className="form-input"
            value={form.role}
            onChange={handleChange}
            placeholder="Frontend Developer, Designer…"
          />
        </div>

        <div className="form-group">
          <label>Experience Level *</label>
          <select
            name="level"
            className="form-input"
            value={form.level}
            onChange={handleChange}
          >
            <option value="">Select Level</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Save Personnel
        </button>
      </form>
    </div>
  );
}
