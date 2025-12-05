import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createProjectSkill,
} from "../../services/ProjectSkillAPI";
import { getAllProjects } from "../../services/ProjectAPI";
import { getAllSkills } from "../../services/SkillAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function Create() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    project_id: "",
    skill_id: "",
    min_proficiency: "",
  });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const projectRes = await getAllProjects();
        const skillRes = await getAllSkills();
        setProjects(projectRes.data);
        setSkills(skillRes.data);
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to load projects or skills.", type: "error" });
      }
    };
    fetchDropdowns();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.project_id || !form.skill_id || !form.min_proficiency) {
      setToast({ message: "All fields are required.", type: "error" });
      return;
    }

    try {
      await createProjectSkill(form);
      setToast({ message: "Project Skill added successfully!", type: "success" });

      setTimeout(() => navigate("/project-skill"), 1000);
    } catch (err) {
      console.error(err);
      setToast({
        message: err.response?.data?.message || "Server error. Please try again.",
        type: "error",
      });
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

      <h2 className="personnel-title">Add Project Skill</h2>

      <form onSubmit={handleSubmit} className="personnel-form">
        <div className="form-group">
          <label>Project *</label>
          <select
            name="project_id"
            value={form.project_id}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Project</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Skill *</label>
          <select
            name="skill_id"
            value={form.skill_id}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Skill</option>
            {skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Minimum Proficiency *</label>
          <select
            name="min_proficiency"
            value={form.min_proficiency}
            onChange={handleChange}
            className="form-input"
          >
            <option value="">Select Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Save Project Skill
        </button>
      </form>
    </div>
  );
}
