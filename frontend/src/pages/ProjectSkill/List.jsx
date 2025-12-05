import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProjectSkills,
  deleteProjectSkill,
} from "../../services/ProjectSkillAPI";
import Toast from "../../components/Toast";
import "../../styles/personnel.css";

export default function List() {
  const [skills, setSkills] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const fetchSkills = async () => {
    try {
      const res = await getAllProjectSkills();
      setSkills(res.data);
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to fetch project skills.", type: "error" });
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;

    try {
      await deleteProjectSkill(id);
      setToast({ message: "Project skill deleted successfully!", type: "success" });
      fetchSkills();
    } catch (err) {
      console.error(err);
      setToast({ message: "Failed to delete project skill.", type: "error" });
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
