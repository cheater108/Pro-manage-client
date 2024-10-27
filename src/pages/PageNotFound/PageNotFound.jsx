import styles from "./PageNotFound.module.css";
import { useNavigate } from "react-router-dom";
import astronaut from "../../assets/astronaut.svg";

function PageNotFound() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <div className={styles.notfound}>
                <div>
                    <img src={astronaut} alt="astronaut" height={300} />
                </div>
                &#9888; Page not found
                <div className={styles.btns}>
                    <button
                        className={styles.btn}
                        onClick={() => navigate("/")}
                    >
                        Dashboard
                    </button>
                    <button
                        className={styles.btn}
                        onClick={() => navigate("/user")}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageNotFound;
