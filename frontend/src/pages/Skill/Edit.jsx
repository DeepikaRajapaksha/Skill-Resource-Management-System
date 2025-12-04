import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSkill, updateSkill } from "../../services/SkillAPI";
import "../../styles/personnel.css";  

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
  });

  const [error, setError] = useState("");

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
        alert("Skill not found");
        navigate("/skills");
      }
    };

    fetchSkill();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const update = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.category) {
      setError("Skill Name and Category are required.");
      return;
    }

    try {
      await updateSkill(id, form);
      navigate("/skills");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update skill");
    }
  };

  return (
    <div className="personnel-container">
      <h2 className="personnel-title">Edit Skill</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={update}>
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
