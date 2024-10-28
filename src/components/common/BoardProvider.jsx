import { createContext } from "react";
import { useEffect, useState } from "react";
import { getBoard } from "../../api/boardApi";
import { logout } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

export const BoardContext = createContext(null);

function BoardProvider({ children }) {
    const navigate = useNavigate();
    const [board, setBoard] = useState({
        backlog: [],
        todo: [],
        inprogress: [],
        done: [],
    });
    const [filter, setFilter] = useState("This Week");

    function updateBoard() {
        getBoard(filter)
            .then((data) => setBoard(data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        function loadBoard() {
            getBoard()
                .then((data) => setBoard(data))
                .catch((err) => {
                    // incase of invalid jwt logout user
                    logout();
                    navigate("/user");
                });
        }
        loadBoard();
    }, []);

    // if filter changes update board
    useEffect(() => {
        updateBoard();
    }, [filter]);

    return (
        <BoardContext.Provider
            value={{ board, filter, updateBoard, setFilter }}
        >
            {children}
        </BoardContext.Provider>
    );
}

export default BoardProvider;
