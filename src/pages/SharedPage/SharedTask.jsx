import styles from "./SharedTask.module.css";
import codesandbox from "../../assets/codesandbox.svg";
import PublicTaskCard from "../../components/SharedTask/PublicTaskCard";
import { getPublicTask } from "../../api/taskApi";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import astronaut from "../../assets/astronaut.svg";

function SharedTask() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [task, setTask] = useState({});
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        getPublicTask(id)
            .then((data) => {
                setLoading(false);
                setTask(data);
            })
            .catch((err) => {
                setLoading(false);
                setNotFound(true);
            });
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.nav_header}>
                    <img src={codesandbox} alt="logo" />
                    <p className={styles.nav_heading}>Pro Manage</p>
                </div>
            </div>
            <div className={styles.main}>
                {loading ? (
                    <p>Loading</p>
                ) : (
                    !notFound && <PublicTaskCard task={task} />
                )}
                {notFound && (
                    <div className={styles.notfound}>
                        <div>
                            <img src={astronaut} alt="astronaut" height={300} />
                        </div>
                        &#9888; 404 task not found
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
                )}
            </div>
        </div>
    );
}

export default SharedTask;
