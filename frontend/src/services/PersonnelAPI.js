import api from "./api";

// List all personnel
export const getAllPersonnel = () => api.get("/personnel");

// Get single personnel by ID
export const getPersonnel = (id) => api.get(`/personnel/${id}`);

// Create new personnel
export const createPersonnel = (data) => api.post("/personnel", data);

// Update existing personnel
export const updatePersonnel = (id, data) => api.put(`/personnel/${id}`, data);

// Delete personnel
export const deletePersonnel = (id) => api.delete(`/personnel/${id}`);
