import api from "./api";

// List all assignments
export const getAllAssignments = () => api.get("/personnel-skills");

// Get single assignment by ID
export const getAssignment = (id) => api.get(`/personnel-skills/${id}`);

// Create new assignment
export const createAssignment = (data) => api.post("/personnel-skills", data);

// Update existing assignment
export const updateAssignment = (id, data) => api.put(`/personnel-skills/${id}`, data);

// Delete assignment
export const deleteAssignment = (id) => api.delete(`/personnel-skills/${id}`);

