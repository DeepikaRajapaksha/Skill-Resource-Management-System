import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPersonnel } from "../../services/PersonnelAPI";
import { getAllSkills } from "../../services/SkillAPI";
import { createAssignment } from "../../services/AssignmentAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function Create() {
  const navigate = useNavigate();
  const [personnelList, setPersonnelList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    personnel_id: "",
    skill_id: "",
    proficiency: "Beginner",
  });

  // Load Personnel + Skills
  useEffect(() => {
    const fetchData = async () => {
      try {
        const personnel = await getAllPersonnel();
        const skills = await getAllSkills();

        setPersonnelList(personnel.data);
        setSkillsList(skills.data);
      } catch (err) {
        console.error(err);
        setToast({ message: "Failed to load personnel or skills!", type: "error" });
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.personnel_id || !form.skill_id) {
      setToast({ message: "Personnel and Skill are required!", type: "error" });
      return;
    }

    try {
      await createAssignment(form);

      setToast({ message: "Skill assigned successfully!", type: "success" });

      setTimeout(() => navigate("/personnel-skills"), 1000);
    } catch (err) {
      console.error("Create assignment error:", err);

      setToast({
        message: err.response?.data?.message || "Failed to assign skill!",
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

      <h2 className="personnel-title">Assign Skill to Personnel</h2>

      <form onSubmit={handleSubmit} className="personnel-form">
        <div className="form-group">
          <label>Personnel *</label>
          <select
            name="personnel_id"
            className="form-input"
            value={form.personnel_id}
            onChange={handleChange}
          >
            <option value="">Select Personnel</option>
            {personnelList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.email})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Skill *</label>
          <select
            name="skill_id"
            className="form-input"
            value={form.skill_id}
            onChange={handleChange}
          >
            <option value="">Select Skill</option>
            {skillsList.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.category})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Proficiency *</label>
          <select
            name="proficiency"
            className="form-input"
            value={form.proficiency}
            onChange={handleChange}
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
            <option>Expert</option>
          </select>
        </div>

        <button className="btn-submit" type="submit">
          Assign Skill
        </button>
      </form>
    </div>
  );
}
