import api from "./api";

async function getBoard(filter = "This Week") {
    const result = await api.get("/board", {
        params: {
            filter,
        },
    });
    return result.data;
}

async function getAdditionalInfo() {
    const result = await api.get("/board/info");
    return result.data;
}

async function shareBoard(data) {
    const result = await api.post("/board/share", data);
    return result.data;
}

export { getBoard, shareBoard, getAdditionalInfo };
