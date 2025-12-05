// services/ProjectAssignmentAPI.js
import api from "./api";

export const getAllProjectAssignments = () => api.get("/project-assignments");
export const getProjectAssignment = (id) => api.get(`/project-assignments/${id}`);
export const createProjectAssignment = (data) => api.post("/project-assignments", data);
export const updateProjectAssignment = (id, data) => api.put(`/project-assignments/${id}`, data);
export const deleteProjectAssignment = (id) => api.delete(`/project-assignments/${id}`);
