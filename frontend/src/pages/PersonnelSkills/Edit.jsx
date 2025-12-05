import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSkill, updateSkill } from "../../services/SkillAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [toast, setToast] = useState(null);

  // Fetch skill by ID
  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const res = await getSkill(id);
        setForm({
          name: res.data.name || "",
          category: res.data.category || "",
          description: res.data.description || "",
        });
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to fetch skill data.", type: "error" });
        setTimeout(() => navigate("/skills"), 2000);
      }
    };

    fetchSkill();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.category) {
      setToast({
        message: "Skill Name and Category are required!",
        type: "error",
      });
      return;
    }

    try {
      await updateSkill(id, form);
      setToast({ message: "Skill updated successfully!", type: "success" });

      setTimeout(() => navigate("/skills"), 1000);
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || "Failed to update skill",
        type: "error",
      });
    }
  };

  return (
    <div className="personnel-container">
      {/* Toast message */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2 className="personnel-title">Edit Skill</h2>

      <form onSubmit={handleUpdate} className="personnel-form">
        <div className="form-group">
          <label>Skill Name *</label>
          <input
            type="text"
            name="name"
            className="form-input"
            value={form.name}
            onChange={handleChange}
            placeholder="React, PHP, UI/UX..."
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            type="text"
            name="category"
            className="form-input"
            value={form.category}
            onChange={handleChange}
            placeholder="Framework, Language, Tool..."
          />
        </div>

        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            name="description"
            className="form-textarea"
            rows="4"
            value={form.description}
            onChange={handleChange}
            placeholder="Short description"
          />
        </div>

        <button type="submit" className="btn-submit">
          Update Skill
        </button>
      </form>
    </div>
  );
}
