import styles from "./Todo.module.css";
import delete_icon from "../../assets/delete.svg";

function Todo({ task, done, setTodos, id }) {
    function handleChange(e) {
        setTodos((prev) => {
            return prev.map((todo) => {
                // we can have either _id from db or when we are adding from ui.
                const idPresent = todo._id || todo.id;
                if (idPresent === id) {
                    todo.task = e.target.value;
                }
                return todo;
            });
        });
    }

    function handleCheck(e) {
        setTodos((prev) => {
            return prev.map((todo) => {
                const idPresent = todo._id || todo.id;
                if (idPresent === id) {
                    todo.done = e.target.checked;
                }
                return todo;
            });
        });
    }

    function deleteTodo() {
        setTodos((prev) => {
            return prev.filter((todo) => {
                const idPresent = todo._id || todo.id;
                return idPresent !== id;
            });
        });
    }
    return (
        <div className={styles.task}>
            <label className={styles.container_checkbox}>
                <input type="checkbox" checked={done} onChange={handleCheck} />
                <span className={styles.checkmark}></span>
            </label>
            <input
                className={styles.task_input}
                type="text"
                placeholder="type todo"
                value={task}
                onChange={handleChange}
            />
            <img
                className={styles.delete}
                src={delete_icon}
                alt="delete"
                onClick={deleteTodo}
            />
        </div>
    );
}

export default Todo;
