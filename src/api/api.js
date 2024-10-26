import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_LOCAL_API_BASE,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
