import api from "./api";

export const getAllProjectSkills = () => api.get("/project-skills");
export const getProjectSkill = (id) => api.get(`/project-skills/${id}`);
export const createProjectSkill = (data) => api.post("/project-skills", data);
export const updateProjectSkill = (id, data) => api.put(`/project-skills/${id}`, data);
export const deleteProjectSkill = (id) => api.delete(`/project-skills/${id}`);
