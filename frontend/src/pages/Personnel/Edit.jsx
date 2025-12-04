import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPersonnel, updatePersonnel } from "../../services/PersonnelAPI"; 
import "../../styles/personnel.css";

export default function Edit() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    level: "",
  });
  const [error, setError] = useState("");

  // Fetch personnel by ID when component mounts
  useEffect(() => {
    const fetchPersonnel = async () => {
      try {
        const res = await getPersonnel(id);
        setForm({
          name: res.data.name || "",
          email: res.data.email || "",
          role: res.data.role || "",
          level: res.data.level || "",
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch personnel data.");
        navigate("/personnel"); 
      }
    };
    fetchPersonnel();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
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
      await updatePersonnel(id, form); 
      navigate("/personnel"); 
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Please try again.");
    }
  };

  return (
    <div className="personnel-container">
      <h2 className="personnel-title">Edit Personnel</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleUpdate}>
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
            <option>Junior</option>
            <option>Mid-Level</option>
            <option>Senior</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Update Personnel
        </button>
      </form>
    </div>
  );
}
