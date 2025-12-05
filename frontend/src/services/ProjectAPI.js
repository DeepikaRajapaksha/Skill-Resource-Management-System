import api from "./api";

// List all projects
export const getAllProjects = () => api.get("/projects");

// Get single project by ID
export const getProject = (id) => api.get(`/projects/${id}`);

// Create new project
export const createProject = (data) => api.post("/projects", data);

// Update existing project
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);

// Delete project
export const deleteProject = (id) => api.delete(`/projects/${id}`);
