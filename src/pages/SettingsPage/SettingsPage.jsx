import EditUser from "../../components/Settings/EditUser";
import styles from "./SettingsPage.module.css";

function SettingsPage() {
    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Settings</h1>
            <div className={styles.inner}>
                <EditUser />
            </div>
        </div>
    );
}

export default SettingsPage;
