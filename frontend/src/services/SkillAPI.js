import api from "./api";

// Skill CRUD APIs

export const getAllSkills = () => api.get("/skills");

export const getSkill = (id) => api.get(`/skills/${id}`);

export const createSkill = (data) => api.post("/skills", data);

export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);

export const deleteSkill = (id) => api.delete(`/skills/${id}`);
