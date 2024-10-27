import { useEffect, useState } from "react";
import styles from "./AnalyticsCard.module.css";
import { getAdditionalInfo } from "../../api/boardApi";

function AdditionalInfo() {
    const [info, setInfo] = useState({
        high: 0,
        moderate: 0,
        low: 0,
        due: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        function loadInfo() {
            getAdditionalInfo()
                .then((data) => {
                    setInfo(data);
                    setLoading(false);
                })
                .catch((err) => console.log(err));
        }
        loadInfo();
    }, []);

    if (loading) {
        return <div className={styles.analytics_loading}></div>;
    }

    return (
        <div className={styles.analytics_container}>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.bullet}></div>
                    <p>Low Priority</p>
                </div>
                <div className={styles.right}>{info.low}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.bullet}></div>
                    <p>Moderate Priority</p>
                </div>
                <div className={styles.right}>{info.moderate}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.bullet}></div>
                    <p>High Priority</p>
                </div>
                <div className={styles.right}>{info.high}</div>
            </div>
            <div className={styles.info}>
                <div className={styles.left}>
                    <div className={styles.bullet}></div>
                    <p>Due Date Tasks</p>
                </div>
                <div className={styles.right}>{info.due}</div>
            </div>
        </div>
    );
}

export default AdditionalInfo;
