import styles from "./TaskContainer.module.css";
import add_icon from "../../assets/add.svg";
import collapse_icon from "../../assets/collapse.svg";
import TaskCard from "./TaskCard";
import AddTodo from "./AddTodo";
import { useState } from "react";

function TaskContainer({ type, tasks }) {
    const [collapse, setCollapse] = useState(false);
    const [showAddTodo, setShowAddTodo] = useState(false);

    function handleCollapse() {
        setCollapse(true);
        setTimeout(() => {
            setCollapse(false);
        }, 500);
    }
    return (
        <div className={`${styles.container}`}>
            <div className={styles.header}>
                <p className={styles.heading}>{type}</p>
                <div>
                    {type === "Todo" && (
                        <img
                            className={styles.add_icon}
                            src={add_icon}
                            alt="add todo"
                            onClick={() => setShowAddTodo(true)}
                        />
                    )}
                    <img
                        className={styles.collapse}
                        src={collapse_icon}
                        alt="collapse"
                        onClick={handleCollapse}
                    />
                </div>
            </div>
            <div className={styles.tasks}>
                {tasks.map((task) => (
                    <TaskCard
                        key={task._id}
                        task={task}
                        cardType={type}
                        collapse={collapse}
                    />
                ))}
            </div>
            {showAddTodo && <AddTodo setShowAddTodo={setShowAddTodo} />}
        </div>
    );
}

export default TaskContainer;
