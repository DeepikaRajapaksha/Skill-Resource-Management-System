import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSkill } from "../../services/SkillAPI";
import "../../styles/skill.css"; // same style file as personnel

export default function CreateSkill() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();

    if (!form.name || !form.category) {
      setError("Skill Name and Category are required.");
      return;
    }

    try {
      await createSkill(form);
      navigate("/skills");
    } catch (err) {
      console.error(err);
      setError("Failed to create skill");
    }
  };

  return (
    <div className="personnel-container"> {/* same container style */}
      <h2 className="personnel-title">Add New Skill</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={save}>
        <div className="form-group">
          <label>Skill Name *</label>
          <input
            type="text"
            name="name"
            className="form-input"
            onChange={handleChange}
            placeholder="React, Python, UI/UX..."
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            type="text"
            name="category"
            className="form-input"
            onChange={handleChange}
            placeholder="Framework, Language, Tool..."
          />
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            name="description"
            className="form-input"
            rows="4"
            onChange={handleChange}
          />
        </div>

        <button className="btn-submit" type="submit">
          Save Skill
        </button>
      </form>
    </div>
  );
}
