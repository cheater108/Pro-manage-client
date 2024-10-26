import { useContext } from "react";
import styles from "./AnalyticsCard.module.css";
import { BoardContext } from "../common/BoardProvider";

function AnalyticsCard() {
    const { board } = useContext(BoardContext);
    return (
        <div className={styles.analytics_container}>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.bullet}></div>
                    <p>Backlog Tasks</p>
                </div>
                <div className={styles.right}>{board.backlog.length}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.bullet}></div>
                    <p>To-do Tasks</p>
                </div>
                <div className={styles.right}>{board.todo.length}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.bullet}></div>
                    <p>In-Progress Tasks</p>
                </div>
                <div className={styles.right}>{board.inprogress.length}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.bullet}></div>
                    <p>Completed Tasks</p>
                </div>
                <div className={styles.right}>{board.done.length}</div>
            </div>
        </div>
    );
}

export default AnalyticsCard;
