import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPersonnel } from "../../services/PersonnelAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", role: "", level: "" });
  const [toast, setToast] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.level) {
      setToast({ message: "Name, Email, and Experience Level are required!", type: "error" });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setToast({ message: "Invalid email format!", type: "error" });
      return;
    }

    try {
      await createPersonnel(form);
      setToast({ message: "Developer added successfully!", type: "success" });
      setTimeout(() => navigate("/personnel"), 1000); 
    } catch (err) {
      console.error(err);
      setToast({ message: err.response?.data?.message || "Server error!", type: "error" });
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

      <h2 className="personnel-title">Add Personnel</h2>

      <form onSubmit={handleSubmit} className="personnel-form">
        {/* form fields */}
        <div className="form-group">
          <label>Name *</label>
          <input type="text" name="name" className="form-input" value={form.name} onChange={handleChange} placeholder="Enter full name" />
        </div>
        <div className="form-group">
          <label>Email *</label>
          <input type="email" name="email" className="form-input" value={form.email} onChange={handleChange} placeholder="example@mail.com" />
        </div>
        <div className="form-group">
          <label>Role / Title</label>
          <input type="text" name="role" className="form-input" value={form.role} onChange={handleChange} placeholder="Frontend Developer, Designer…" />
        </div>
        <div className="form-group">
          <label>Experience Level *</label>
          <select name="level" className="form-input" value={form.level} onChange={handleChange}>
            <option value="">Select Level</option>
            <option value="Junior">Junior</option>
            <option value="Mid-Level">Mid-Level</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">Save Developer</button>
      </form>
    </div>
  );
}

