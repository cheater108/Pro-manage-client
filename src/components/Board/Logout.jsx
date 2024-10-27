import modal_style from "./Modal.module.css";
import styles from "./DeleteTask.module.css";
import { logout } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

function Logout({ setShowLogout }) {
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/user");
    }

    return (
        <div className={modal_style.modal}>
            <div className={styles.container}>
                <p className={styles.para}>Are you sure you want to Logout?</p>
                <div className={styles.btns}>
                    <button className={styles.delete} onClick={handleLogout}>
                        Yes, Logout
                    </button>
                    <button
                        className={styles.cancel}
                        onClick={() => setShowLogout(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Logout;
