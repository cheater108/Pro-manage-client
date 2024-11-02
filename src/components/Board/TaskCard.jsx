import styles from "./TaskCard.module.css";
import menu_icon from "../../assets/menu.svg";
import arrow_up from "../../assets/arrow_up.svg";
import arrow_down from "../../assets/arrow_down.svg";
import {
    priorityList,
    countSelected,
    dateString,
    status_list,
    datePassed,
    getNameTag,
} from "../../utils/helpers";
import { useContext, useEffect, useState } from "react";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";
import { updateTask } from "../../api/taskApi";
import { BoardContext } from "../common/BoardProvider";
import CustomToast from "../common/CustomToast";

function Todo({ todo, setTodos, id }) {
    function handleCheck(e) {
        setTodos((prev) => {
            return prev.map((p) => {
                if (p._id === id) {
                    p.done = e.target.checked;
                }
                return p;
            });
        });
    }
    return (
        <div className={styles.task} key={todo._id}>
            <label className={styles.container_checkbox}>
                <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={handleCheck}
                />
                <span className={styles.checkmark}></span>
            </label>
            <p>{todo.task}</p>
        </div>
    );
}

function TaskCard({ task, cardType, collapse }) {
    const { updateBoard } = useContext(BoardContext);
    const [todos, setTodos] = useState(task.checklist);
    const [show, setShow] = useState(false);
    const [menu, setMenu] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [toast, setToast] = useState(false);

    const priorityStyle = priorityList.find((p) => p.name === task.priority);
    const isHighPriority = priorityStyle.name === "High Priority";
    const isDoneType = cardType === "Done";

    function changeTaskStatus(e) {
        updateTask(task._id, { ...task, status: e.target.name })
            .then(() => updateBoard())
            .catch((err) =>
                toast.error(err.response?.data?.error || "something went wrong")
            );
    }

    function shareTask() {
        updateTask(task._id, { ...task, public: true })
            .then((data) => {
                setMenu(false);
                const shareLink = window.location.href.replace(
                    "dashboard",
                    `shared/${task._id}`
                );
                navigator.clipboard
                    .writeText(shareLink)
                    .then(() => setToast(true));
            })
            .catch((err) =>
                toast.error(err.response?.data?.error || "something went wrong")
            );
    }

    // when we update a task using edit, reflect those changes
    useEffect(() => {
        setTodos(task.checklist);
    }, [task]);

    // when we check a todo, update the task in the backend
    useEffect(() => {
        updateTask(task._id, { ...task, checklist: todos });
    }, [todos]);

    // to close all open tasks
    useEffect(() => {
        if (collapse === true) setShow(false);
    }, [collapse]);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <div className={priorityStyle.style}></div>
                    <p>{task.priority}</p>
                    {task.assigned_email && (
                        <div className={styles.assigned}>
                            <p>{getNameTag(task.assigned_email)}</p>
                        </div>
                    )}
                </div>
                <img
                    className={styles.menu_icon}
                    src={menu_icon}
                    alt="menu"
                    onClick={() => setMenu(!menu)}
                />
            </div>
            <h1 title={task.title} className={styles.title}>
                {task.title}
            </h1>
            <div className={styles.checklist_heading}>
                <p className={styles.checklist_text}>
                    Checklist ({countSelected(todos)}/{task.checklist?.length})
                </p>
                <div className={styles.arrow} onClick={() => setShow(!show)}>
                    {show ? (
                        <img src={arrow_up} alt="arrow" />
                    ) : (
                        <img src={arrow_down} alt="arrow" />
                    )}
                </div>
            </div>
            {show && (
                <div className={`${styles.task_list_container}`}>
                    {todos.map((todo) => (
                        <Todo
                            key={todo._id}
                            todo={todo}
                            setTodos={setTodos}
                            id={todo._id}
                        />
                    ))}
                </div>
            )}
            <div className={styles.bottom}>
                {task.due_date && (
                    <div
                        className={`${styles.date_style} ${
                            (isHighPriority || datePassed(task.due_date)) &&
                            "high_priority_date"
                        } ${isDoneType && "done_date"}`}
                    >
                        {dateString(task.due_date)}
                    </div>
                )}
                <div className={styles.bottom_right}>
                    {status_list.map((status) => {
                        if (status.type !== cardType) {
                            return (
                                <button
                                    key={status.type}
                                    name={status.type}
                                    className={styles.btn_style}
                                    onClick={changeTaskStatus}
                                >
                                    {status.display}
                                </button>
                            );
                        }
                    })}
                </div>
            </div>
            {menu && (
                <div className={styles.menu}>
                    <p
                        className={styles.menu_item}
                        onClick={() => {
                            setEdit(true);
                            setMenu(false);
                        }}
                    >
                        Edit
                    </p>
                    <p className={styles.menu_item} onClick={shareTask}>
                        Share
                    </p>
                    <p
                        className={styles.delete}
                        onClick={() => {
                            setDel(true);
                            setMenu(false);
                        }}
                    >
                        Delete
                    </p>
                </div>
            )}
            {edit && <EditTask taskData={task} setEdit={setEdit} />}
            {del && <DeleteTask id={task._id} setDel={setDel} />}
            {toast && <CustomToast text={"Link copied"} setToast={setToast} />}
        </div>
    );
}

export default TaskCard;
