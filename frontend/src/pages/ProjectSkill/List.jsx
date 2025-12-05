import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProjectSkills,
  deleteProjectSkill,
} from "../../services/ProjectSkillAPI";
import "../../styles/personnel.css"; // reuse existing CSS

export default function List() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  const fetchSkills = async () => {
    try {
      const res = await getAllProjectSkills();
      setSkills(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch project skills.");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteProjectSkill(id);
        fetchSkills();
      } catch (err) {
        console.error(err);
        alert("Failed to delete project skill.");
      }
    }
  };

  return (
    <div className="personnel-container">
      <div className="personnel-header">
        <h2 className="personnel-title">Project Skills</h2>
        <button
          onClick={() => navigate("/project-skill/create")}
          className="btn-primary"
        >
          + Add Project Skill
        </button>
      </div>

      <div className="personnel-table-wrapper">
        <table className="personnel-table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Skill Name</th>
              <th>Minimum Proficiency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.length > 0 ? (
              skills.map((s) => (
                <tr key={s.id}>
                  <td>{s.Project?.name || "N/A"}</td>
                  <td>{s.Skill?.name || "N/A"}</td>
                  <td>{s.min_proficiency}</td>
                  <td className="personnel-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/project-skill/edit/${s.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No project skills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
