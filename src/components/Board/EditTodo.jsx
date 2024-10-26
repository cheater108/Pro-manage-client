import modal_style from "./Modal.module.css";
import styles from "./AddTodo.module.css";
import dropdown_icon from "../../assets/dropdown.svg";
import { useContext, useState } from "react";
import { updateTask } from "../../api/taskApi";
import {
    priorityList,
    countSelected,
    isOwner,
    getUser,
} from "../../utils/helpers";
import { BoardContext } from "../common/BoardProvider";
import Todo from "../common/Todo";
import UserList from "../common/UserList";

function EditTodo({ taskData, setEdit }) {
    const { updateBoard } = useContext(BoardContext);
    const [task, setTask] = useState(taskData);
    const [todos, setTodos] = useState(taskData.checklist);
    const [assign, setAssign] = useState(false);

    function addTodo() {
        setTodos((prev) => [
            ...prev,
            { task: "Task", done: false, id: Date.now() },
        ]);
    }

    function handleTaskChange(e) {
        setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function submitTask() {
        updateTask(task._id, { ...task, checklist: todos })
            .then(() => {
                updateBoard();
                setEdit(false);
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className={modal_style.modal}>
            <div className={styles.container}>
                <p className={styles.title}>
                    Title <span className={styles.required}>*</span>
                </p>
                <input
                    className={styles.title_input}
                    type="text"
                    name="title"
                    placeholder="Enter Task Title"
                    value={task.title}
                    onChange={handleTaskChange}
                />
                <div className={styles.priority_container}>
                    <p className={styles.title}>
                        Select Priority{" "}
                        <span className={styles.required}>*</span>
                    </p>
                    {priorityList.map((priority) => {
                        if (priority.name === task.priority) {
                            return (
                                <button
                                    key={priority.name}
                                    className={`${styles.btn} ${styles.selected}`}
                                    name={priority.name}
                                >
                                    <div className={priority.style}></div>
                                    {priority.name.toUpperCase()}
                                </button>
                            );
                        }
                        return (
                            <button
                                key={priority.name}
                                className={styles.btn}
                                name={priority.name}
                                onClick={(e) =>
                                    setTask({
                                        ...task,
                                        priority: e.target.name,
                                    })
                                }
                            >
                                <div className={priority.style}></div>
                                {priority.name.toUpperCase()}
                            </button>
                        );
                    })}
                </div>
                {isOwner(getUser().email, task.creator) && (
                    <div className={styles.assign}>
                        <p className={styles.title}>Assign to</p>
                        <div className={styles.assign_container}>
                            <input
                                className={styles.assign_input}
                                type="text"
                                name="assigned_email"
                                placeholder="Add an assignee"
                                value={task.assigned_email}
                            />
                            <img
                                className={styles.dropdown}
                                src={dropdown_icon}
                                alt="assign"
                                onClick={() => {
                                    setAssign((prev) => !prev);
                                }}
                            />
                            {assign && (
                                <UserList setUser={setTask} view={setAssign} />
                            )}
                        </div>
                    </div>
                )}
                <div className={styles.checklist_heading}>
                    <p className={styles.checklist_text}>
                        Checklist ({countSelected(todos)}/{todos.length})
                        <span className={styles.required}>*</span>
                    </p>
                </div>
                <div className={styles.task_list_container}>
                    <div className={styles.todo_wrapper}>
                        {todos.map((todo) => {
                            return (
                                <Todo
                                    key={todo._id || todo.id}
                                    task={todo.task}
                                    done={todo.done}
                                    setTodos={setTodos}
                                    id={todo._id || todo.id}
                                />
                            );
                        })}
                    </div>
                    <p className={styles.addnew} onClick={addTodo}>
                        {" "}
                        <span>+</span> Add New
                    </p>
                </div>
                <div className={styles.btn_container}>
                    <input
                        name="due_date"
                        type="date"
                        value={task.due_date?.substr(0, 10) || ""}
                        onChange={handleTaskChange}
                    />
                    <div className={styles.btns}>
                        <button
                            className={styles.cancel}
                            onClick={() => setEdit(false)}
                        >
                            Cancel
                        </button>
                        <button className={styles.save} onClick={submitTask}>
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditTodo;
