import modal_style from "./Modal.module.css";
import styles from "./ShareBoard.module.css";
import dropdown_icon from "../../assets/dropdown.svg";
import UserList from "../common/UserList";

function ShareBoard({ setShowShare }) {
    const [assign, setAssign] = useState(false);
    const [user, setUser] = useState({ assigned_email: "" });

    function handleShare() {
        shareBoard({ share_email: user.assigned_email })
            .then((data) => {
                console.log(data);
                setShowShare(false);
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className={modal_style.modal}>
            <div className={styles.container}>
                <p className={styles.heading}>Add people to the board</p>
                <div
                    className={styles.assign_container}
                    onClick={() => {
                        setAssign((prev) => {
                            return !prev;
                        });
                    }}
                >
                    <div className={styles.assign_input}>
                        {user.assigned_email === ""
                            ? "Enter the email"
                            : user.assigned_email}
                    </div>
                    <img
                        className={styles.dropdown}
                        src={dropdown_icon}
                        alt="assign"
                    />
                    {assign && <UserList setUser={setUser} view={setAssign} />}
                </div>
                <div className={styles.btns}>
                    <button
                        className={styles.cancel}
                        onClick={() => setShowShare(false)}
                    >
                        Cancel
                    </button>
                    <button className={styles.add} onClick={handleShare}>
                        Add email
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useState } from "react";
import { shareBoard } from "../../api/boardApi";

export default ShareBoard;
