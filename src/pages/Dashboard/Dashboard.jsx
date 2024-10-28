import styles from "./Dashboard.module.css";
import codesandbox from "../../assets/codesandbox.svg";
import board_icon from "../../assets/layout.svg";
import database_icon from "../../assets/database.svg";
import setting_icon from "../../assets/settings.svg";
import logout_icon from "../../assets/logout.svg";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import Logout from "../../components/Board/Logout";

// root dashboard layout
function Dashboard() {
    const [showLogout, setShowLogout] = useState(false);

    return (
        <div className={styles.container}>
            <nav className={styles.sidenav}>
                <div className={styles.nav_header}>
                    <img src={codesandbox} alt="logo" />
                    <p className={styles.nav_heading}>Pro Manage</p>
                </div>
                <div className={styles.links}>
                    <NavLink className={styles.nav_link} to={"/dashboard"}>
                        <img src={board_icon} alt="board" />
                        <p className={styles.nav_text}>Board</p>
                    </NavLink>
                    <NavLink className={styles.nav_link} to={"/analytics"}>
                        <img src={database_icon} alt="analytics" />
                        <p className={styles.nav_text}>Analytics</p>
                    </NavLink>
                    <NavLink className={styles.nav_link} to={"/settings"}>
                        <img src={setting_icon} alt="settings" />
                        <p className={styles.nav_text}>Settings</p>
                    </NavLink>
                </div>
                <button
                    className={styles.logout_btn}
                    onClick={() => setShowLogout(true)}
                >
                    <img src={logout_icon} alt="logout" />
                    <p className={styles.logout_text}>Log out</p>
                </button>
            </nav>
            <main className={styles.main}>
                <Outlet />
            </main>
            {showLogout && <Logout setShowLogout={setShowLogout} />}
        </div>
    );
}

export default Dashboard;
