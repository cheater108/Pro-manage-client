import collapse_icon from "../../assets/collapse.svg";
import add_icon from "../../assets/add.svg";
import styles from "./TaskContainer.module.css";
import AddTodo from "./AddTodo";
import TaskCard from "./TaskCard";
import { useState } from "react";

function TodoContainer({ tasks }) {
    const [showAddTodo, setShowAddTodo] = useState(false);
    return (
        <div className={`${styles.container}`}>
            <div className={styles.header}>
                <p className={styles.heading}>Todo</p>
                <div>
                    <img
                        className={styles.add_icon}
                        src={add_icon}
                        alt="add todo"
                        onClick={() => setShowAddTodo(true)}
                    />
                    <img
                        className={styles.collase}
                        src={collapse_icon}
                        alt="collapse"
                    />
                </div>
            </div>
            <div className={styles.tasks}>
                {tasks.map((task) => (
                    <TaskCard key={task._id} task={task} cardType="Todo" />
                ))}
            </div>
            {showAddTodo && <AddTodo setShowAddTodo={setShowAddTodo} />}
        </div>
    );
}

export default TodoContainer;
