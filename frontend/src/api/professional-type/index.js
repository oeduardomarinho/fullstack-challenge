import api from "../../services/api";

export const getAll = () => api.get("/professional-types");

export const retrieve = ({ id }) => api.get(`/professional-types/${id}`);

export const create = (data) => api.post("/professional-types", data);

export const update = (data, id) => api.put(`/professional-types/${id}`, data);

export const destroy = (data, id) => api.delete(`/professional-types/${id}`, data);