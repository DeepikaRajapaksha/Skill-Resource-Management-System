import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSkills, deleteSkill } from "../../services/SkillAPI";
import "../../styles/skill.css";

export default function SkillList() {
  const [skills, setSkills] = useState([]);
  const navigate = useNavigate();

  // Fetch skills
  const fetchSkills = async () => {
    try {
      const res = await getAllSkills();
      setSkills(res.data);
    } catch (err) {
      console.error("Failed to fetch skills:", err);
      alert("Failed to fetch skills");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Delete skill
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await deleteSkill(id);
        fetchSkills();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }
  };

  return (
    <div className="personnel-container"> {/* SAME STYLING */}
      <div className="personnel-header">
        <h2 className="personnel-title">Skill Catalog</h2>
        <button
          onClick={() => navigate("/skills/create")}
          className="btn-primary"
        >
          + Add Skill
        </button>
      </div>

      <div className="personnel-table-wrapper">
        <table className="personnel-table"> {/* SAME TABLE STYLE */}
          <thead>
            <tr>
              <th>Skill Name</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {skills.length > 0 ? (
              skills.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{s.category}</td>
                  <td>{s.description || "—"}</td>
                  <td className="personnel-actions">
                    <button
                      className="btn-edit"
                      onClick={() => navigate(`/skills/edit/${s.id}`)}
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
                  No skills found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
