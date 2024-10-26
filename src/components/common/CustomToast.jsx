import { useEffect } from "react";
import styles from "./CustomToast.module.css";

function CustomToast({ text, setToast }) {
    useEffect(() => {
        setTimeout(() => {
            setToast(false);
        }, 2200);
    }, []);
    return <div className={styles.container}>{text}</div>;
}

export default CustomToast;
