import styles from "./PublicTaskCard.module.css";
import { priorityList, countSelected, dateString } from "../../utils/helpers";

function Todo({ todo }) {
    return (
        <div className={styles.task} key={todo._id}>
            <label className="container_checkbox">
                <input type="checkbox" checked={todo.done} />
                <span className="checkmark"></span>
            </label>
            <p>{todo.task}</p>
        </div>
    );
}

function PublicTaskCard({ task }) {
    const priorityStyle = priorityList.find((p) => p.name === task.priority);

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <div className={priorityStyle.style}></div>
                    <p>{task.priority}</p>
                </div>
            </div>
            <h1 title={task.title} className={styles.title}>
                {task.title}
            </h1>
            <div className={styles.checklist_heading}>
                <p className={styles.checklist_text}>
                    Checklist ({countSelected(task.checklist)}/
                    {task.checklist?.length})
                </p>
            </div>

            <div className={styles.task_list_container}>
                {task.checklist.map((todo) => (
                    <Todo key={todo._id} todo={todo} id={todo._id} />
                ))}
            </div>

            <div className={styles.bottom}>
                {task.due_date && (
                    <>
                        <p className={styles.due_date}>Due Date</p>
                        <div
                            className={`${styles.date_style} high_priority_date`}
                        >
                            {dateString(task.due_date)}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default PublicTaskCard;
