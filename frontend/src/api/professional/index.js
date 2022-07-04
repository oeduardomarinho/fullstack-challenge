import api from "../../services/api";

export const getAll = () => api.get("/professionals");

export const retrieve = (id) => api.get(`/professionals/${id}`);

export const create = (data) => api.post("/professionals", data);

export const update = (id, data) => api.put(`/professionals/${id}`, data);

export const destroy = (id, data) => api.delete(`/professionals/${id}`, data);