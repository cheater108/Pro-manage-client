import styles from "./HomePage.module.css";
import atronaut from "../../assets/astronaut.svg";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function HomePage() {
    return (
        <div className={styles.main}>
            <div className={styles.left}>
                <img src={atronaut} alt="astronaut" />
                <h1 className={styles.heading}>Welcome aboard my friend</h1>
                <p className={styles.para}>
                    just a couple of clicks and we start
                </p>
            </div>
            <div className={styles.right}>
                <Outlet />
            </div>
            <Toaster />
        </div>
    );
}

export default HomePage;
