import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllPersonnel } from "../../services/PersonnelAPI";
import { getAllSkills } from "../../services/SkillAPI";
import { getAssignment, updateAssignment } from "../../services/AssignmentAPI";
import "../../styles/personnel.css";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personnelList, setPersonnelList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [form, setForm] = useState({
    personnel_id: "",
    skill_id: "",
    proficiency: "Beginner",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personnel = await getAllPersonnel();
        const skills = await getAllSkills();
        setPersonnelList(personnel.data);
        setSkillsList(skills.data);

        const assignment = await getAssignment(id);
        setForm({
          personnel_id: assignment.data.personnel_id,
          skill_id: assignment.data.skill_id,
          proficiency: assignment.data.proficiency,
        });
      } catch (err) {
        console.error(err);
        alert("Failed to fetch data.");
        navigate("/personnel-skills");
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.personnel_id || !form.skill_id) {
      setError("Personnel and Skill must be selected.");
      return;
    }
    try {
      await updateAssignment(id, form);
      alert("Assignment updated!");
      navigate("/personnel-skills");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to update assignment.");
    }
  };

  return (
    <div className="personnel-container">
      <h2 className="personnel-title">Edit Skill Assignment</h2>
      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
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
          Update Assignment
        </button>
      </form>
    </div>
  );
}
