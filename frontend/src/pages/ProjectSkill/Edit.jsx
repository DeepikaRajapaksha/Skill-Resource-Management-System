import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProjectSkill,
  updateProjectSkill,
} from "../../services/ProjectSkillAPI";
import { getAllProjects } from "../../services/ProjectAPI";
import { getAllSkills } from "../../services/SkillAPI";
import "../../styles/personnel.css";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    project_id: "",
    skill_id: "",
    min_proficiency: "",
  });
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDropdowns = async () => {
      try {
        const projectRes = await getAllProjects();
        const skillRes = await getAllSkills();
        setProjects(projectRes.data);
        setSkills(skillRes.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load projects or skills.");
      }
    };

    const fetchSkillData = async () => {
      try {
        const res = await getProjectSkill(id);
        setForm({
          project_id: res.data.project_id,
          skill_id: res.data.skill_id,
          min_proficiency: res.data.min_proficiency,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch project skill data.");
        navigate("/project-skill");
      }
    };

    fetchDropdowns();
    fetchSkillData();
  }, [id, navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.project_id || !form.skill_id || !form.min_proficiency) {
      setError("All fields are required.");
      return;
    }

    try {
      await updateProjectSkill(id, form);
      navigate("/project-skill");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <div className="personnel-container">
      <h2 className="personnel-title">Edit Project Skill</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleUpdate} className="personnel-form">
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
          Update Project Skill
        </button>
      </form>
    </div>
  );
}
