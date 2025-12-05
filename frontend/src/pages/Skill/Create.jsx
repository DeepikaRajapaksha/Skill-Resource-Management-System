import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSkill } from "../../services/SkillAPI";
import Toast from "../../components/Toast"; 
import "../../styles/skill.css";

export default function CreateSkill() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [error, setError] = useState("");
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const save = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.name.trim() || !form.category.trim()) {
      setToast({ message: "Please fill all required fields!", type: "error" });
      return;
    }

    try {
      await createSkill(form);

      // success toast
      setToast({ message: "Skill created successfully!", type: "success" });

      setTimeout(() => {
        navigate("/skills");
      }, 1200);

    } catch (err) {
      console.error(err);
      setError("Failed to create skill");

      // error toast
      setToast({ message: "Failed to create skill!", type: "error" });
    }
  };

  return (
    <div className="personnel-container">
      {/* show toast */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}

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
