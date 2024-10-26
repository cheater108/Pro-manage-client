import api from "./api";

async function getUsers() {
    const result = await api.get("/user");
    return result.data;
}

async function postUser(data) {
    const result = await api.post("/user/register", data);
    return result.data;
}

async function postLogin(data) {
    const result = await api.post("/user/login", data);
    return result.data;
}

async function editUser(data) {
    const result = await api.post("/user/edit", data);
    return result.data;
}
export { getUsers, postUser, postLogin, editUser };
