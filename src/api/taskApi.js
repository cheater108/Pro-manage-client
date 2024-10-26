import axios from "axios";
import api from "./api";

async function postTask(data) {
    const result = await api.post("/task", data);
    return result.data;
}

async function updateTask(id, data) {
    const result = await api.put(`/task/${id}`, data);
    return result.data;
}

async function deleteTask(id) {
    const result = await api.delete(`/task/${id}`);
    return result.data;
}

async function getPublicTask(id) {
    const result = await api.get(`/task/public/${id}`);
    return result.data;
}

export { postTask, updateTask, deleteTask, getPublicTask };
