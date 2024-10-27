import { useEffect, useState } from "react";
import styles from "./AnalyticsCard.module.css";
import { getBoard } from "../../api/boardApi";

function AnalyticsCard() {
    const [board, setBoard] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getBoard("All").then((data) => {
            setBoard(data);
            setLoading(false);
        });
    });

    if (loading) {
        return <div className={styles.analytics_loading}></div>;
    }

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
